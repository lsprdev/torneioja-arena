import localFont from "next/font/local";

const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const bebasNeue = localFont({
    src: "./BebasNeue-Regular.woff",
    variable: "--font-bebas-neue",
    weight: "400",
});

export {
    geistSans,
    geistMono,
    bebasNeue,
};