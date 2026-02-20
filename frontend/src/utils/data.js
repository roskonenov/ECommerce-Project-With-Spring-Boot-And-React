import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";

export const slidesData =
    [
        {
            id: 1,
            image: "https://i.ibb.co/kgNb420L/Baner-TV-Audio-Video.png",
            title: "Entertainment Hub",
            subtitle: "Smart TVs and Audio",
            description: "Experience the latest in home entertainment",
            categoryLink: '/products?category=TV+%26+Audio'
        },
        {
            id: 2,
            image: "https://i.ibb.co/JR4tH7Fn/Baner-Mobile-Phones.png",
            title: "Stay Connected",
            subtitle: "Latest Smartphones",
            description: "Discover cutting-edge mobile technology",
            categoryLink: '/products?category=Mobile+Phones'
        },
        {
            id: 3,
            image: "https://i.ibb.co/Y7HMBkKj/Baner-Laptops.png",
            title: "Power & Productivity",
            subtitle: "Modern Laptops",
            description: "Boost your workflow with high-performance machines",
            categoryLink: '/products?category=Laptops'
        },
        {
            id: 4,
            image: "https://i.ibb.co/0ynVZwjc/Baner-Wearables.png",
            title: "Smart Living",
            subtitle: "Smartwatches & Fitness Bands",
            description: "Track your health and stay connected everywhere",
            categoryLink: '/products?category=Wearables'
        },
        {
            id: 5,
            image: "https://i.ibb.co/9H9cfxHW/Baner-Home-Appliances.png",
            title: "Home Comfort",
            subtitle: "Appliances for Everyday Life",
            description: "Upgrade your home with smart and efficient solutions",
            categoryLink: '/products?category=Home+Appliances'
        },
        {
            id: 6,
            image: "https://i.ibb.co/4nJmf0jt/Baner-Gaming.png",
            title: "Level Up",
            subtitle: "Consoles & Gaming Gear",
            description: "Immerse yourself in next-gen gaming experiences",
            categoryLink: '/products?category=Gaming'
        },

    ]

export const aboutImages = [
    'https://i.ibb.co/twFH2S5W/digital-marketing-ecommerce-optimized.webp',
    'https://i.ibb.co/n87nmL3Z/e-Commerce-Business.webp',
    'https://i.ibb.co/ynHJDD62/360-F-348054737-Tv5fl9-LQn-Znz-DUwsk-KVKd5-Mzj4-Sj-GFxa.jpg',
    'https://i.ibb.co/YF0hT31X/cover-ecommerce1-optimized.webp',
    'https://i.ibb.co/kVmb86Sk/Perfect-Ecommerce-Sales-Banner.jpg'
];

export const adminNavigation = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: FaHome,
        current: true,
    },
    {
        name: 'Orders',
        href: '/admin/orders',
        icon: FaShoppingCart,
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: FaBoxOpen,
    },
    {
        name: 'Categories',
        href: '/admin/categories',
        icon: FaThList,
    },
    {
        name: 'Sellers',
        href: '/admin/seller',
        icon: FaStore,
    },
];