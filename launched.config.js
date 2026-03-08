/**
 * @Author: colpu
 * @Date: 2026-03-01 22:33:32
 * @LastEditors: colpu ycg520520@qq.com
 * @LastEditTime: 2026-03-08 15:14:03
 * @
 * @Copyright (c) 2026 by colpu, All Rights Reserved. 
 */
import { getConfig } from "@colpu/cli";
const env = process.env.NODE_ENV;
const {
  name,
  config = {},
  pkg = {}
} = await getConfig(import.meta.dirname, { dir: './', env });
const WORKSPACE = `/var/www/${name}`;
const command = [
  "tar -xzf dist.tar.gz",
  `pm2 startOrRestart launched.config.json --env ${env}`,
  'pm2 save && pm2 startup'
];
// 将本地的配置文件复制到远程服务器
function deployLocal() {
  const arr = config.deploy.host.map(ip => {
    return [
      `scp -r dist.tar.gz root@${ip}:${WORKSPACE}/current/dist.tar.gz`,
      `scp -r launched.config.json root@${ip}:${WORKSPACE}/current/launched.config.json`].join(" && ");
  });
  arr.unshift(
    'npm run build',
    'cp -r public .next/standalone/',
    'cp -r .next/static .next/standalone/.next/',
    'tar -czf dist.tar.gz -C .next/standalone .')
  return arr.join(" && ");
}
const setDeployENV = () => {
  const map = {};
  map[env] = Object.assign(
    {
      repo: pkg.repository.url,
      ref: "origin/master",
      host: ["127.0.0.1"],
      user: "root",
      path: WORKSPACE,
    },
    {
      "pre-deploy-local": deployLocal(),
      "pre-setup": `mkdir -p ${WORKSPACE}`,
      "post-deploy": command.join(" && "),
      env: {
        NODE_ENV: env,
      },
    },
    config.deploy
  );
  return map;
};
const LAUNCHED = {
  apps: [
    {
      name,
      script: './dist/server.js', // 启动脚本
      args: 'start', // 启动参数
      cwd: "./",
      instances: 'max',
      max_restarts: 2,
      min_uptime: "1h",
      exec_mode: "cluster",
      max_memory_restart: "1024M",
      node_args: "--experimental-modules --es-module-specifier-resolution=node",
      env: {
        NODE_ENV: 'production',
        HOST: "0.0.0.0",
        HOSTNAME: "0.0.0.0",
        PORT: `${config.port}` // 指定应用运行的端口
      },
      env_preview: {
        NODE_ENV: "preview",
      },
      env_release: {
        NODE_ENV: "release",
      },
      env_production: {
        NODE_ENV: "production",
      },
      error_file: `/var/logs/${name}_err.log`,
      out_file: `/var/logs/${name}_out.log`,
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      interpreter_args: "--no-warnings",
    },
  ],
  deploy: setDeployENV(),
};
export default LAUNCHED;
