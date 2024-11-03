/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloud.appwrite.io'], // Adicione o domínio do Appwrite aqui
  },
  typescript: {
    ignoreBuildErrors: true, // Corrigido de 'ignoreBuildErros' para 'ignoreBuildErrors'
  },
  eslint: {
    ignoreDuringBuilds: true, // Corrigido de 'ignoreBuildErrors' para 'ignoreDuringBuilds'
  },
};

export default nextConfig;
