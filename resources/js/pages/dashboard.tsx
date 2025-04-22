import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { BreadcrumbItem, type User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    }
];


export default function Dashboard() {
    const { auth } = usePage().props as unknown as { auth: { user: User } };
    const user = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />

            <div className="relative grid min-h-[95vh] place-items-center px-4 bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 overflow-hidden">

                {/* 🔵 Círculo con blur tipo glow emerald */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute w-[500px] h-[500px] bg-emerald-500/40 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                />

                {/* Contenedor principal */}
                <section className="relative z-10 w-full">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 items-center min-h-[90vh]">

                            {/* Texto principal */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center lg:text-left space-y-6"
                            >
                                <span className="inline-flex items-center text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full dark:bg-emerald-900/30 dark:text-emerald-300">
                                    🚀 Ya disponible — v1.0
                                </span>

                                <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                                    Administra las Medidas Alternativas <br className="hidden sm:inline" />
                                    con total confianza
                                </h1>

                                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto lg:mx-0">
                                    Plataforma exclusiva para el Poder Judicial de la Ciudad de México que permite la gestión eficiente, segura y transparente de las medidas alternativas.
                                </p>

                                <div className="flex justify-center lg:justify-start gap-4">
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-900 text-white font-semibold px-6 py-3 mt-5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 text-sm"
                                    >
                                        Ingresar al Panel
                                    </a>

                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center rounded-md px-6 py-3 mt-5 text-sm font-semibold text-emerald-700 hover:underline"
                                    >
                                        Más información →
                                    </a>
                                </div>
                            </motion.div>

                            {/* Imagen de interfaz */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="relative"
                            >
                                <div className="mx-auto w-full max-w-xl overflow-hidden animate-float-img">
                                    <img src="/img/Discussion-bro.png" alt="Vista previa del sistema" className="w-full h-auto" />
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
