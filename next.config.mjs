/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cloud.appwrite.io'], // Adicione o domínio do Appwrite aqui
      },
typescript: {
    ignoreBuildErrors: true, // Corrigido de 'ignoreBuildErros' para 'ignoreBuildErrors'
  },
  esLint: {
    ignoreBuildErrors: true, // Corrigido de 'ignoreBuildErros' para 'ignoreBuildErrors'
  },
};

export default nextConfig;
