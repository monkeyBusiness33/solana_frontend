/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    HELIUS_RPC_URL: process.env.HELIUS_RPC_URL,
    GLOBAL_STATE_SEED: process.env.GLOBAL_STATE_SEED,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CONTEST_CREATE_SEED: process.env.CONTEST_CREATE_SEED,
    TOKEN_VAULT_SEED: process.env.TOKEN_VAULT_SEED,
    CONTEST_INFO_SEED: process.env.CONTEST_INFO_SEED,
    WS_URL: process.env.WS_URL,
  }
};

export default nextConfig;
