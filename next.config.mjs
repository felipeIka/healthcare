/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cloud.appwrite.io'], // Adicione o domínio do Appwrite aqui
      },
typescript: {
    ignoreBuildErrors: true, // Corrigido de 'ignoreBuildErros' para 'ignoreBuildErrors'
  },
  eslint: {
    ignoreBuildErrors: true, // Corrigido de 'ignoreBuildErros' para 'ignoreBuildErrors'
  },
};

export default nextConfig;
