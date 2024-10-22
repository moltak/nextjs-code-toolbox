/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Static HTML export
    trailingSlash: true, // 경로에 슬래시를 추가해 정적 파일 접근을 명확히 함
    reactStrictMode: true,
};

export default nextConfig;
