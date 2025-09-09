declare module "next-pwa" {
  import { NextConfig } from "next";

  type PWAOptions = {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    [key: string]: any;
  };

  export default function withPWA(options: PWAOptions): (config: NextConfig) => NextConfig;
}
