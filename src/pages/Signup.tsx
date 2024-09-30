'use client'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

async function signUp(formData: FormData) {
    const response = await fetch('https://spring-estructuras.onrender.com/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to sign up')
    }

    return response.json()
}

export default function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        formData.append('fechaRegistro', new Date().toISOString())
        formData.append('puntosLiga', '0')
        formData.append('foto', 'https://i.pravatar.cc/300')
        formData.append('biografia', 'biografia')
        formData.append('semestreCursando', '1')

        try {
            await signUp(formData)
            navigate('/')
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-black w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Registrate</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nombre" className='text-black'>Nombre</Label>
                        <Input id="nombre" name="nombre" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {/* <div>
                        <Label htmlFor="foto">Foto URL</Label>
                        <Input id="foto" name="foto" type="url" required />
                    </div> */}
                    {/* <div>
                        <Label htmlFor="biografia">Biografía</Label>
                        <Textarea id="biografia" name="biografia" required />
                    </div>
                    <div>
                        <Label htmlFor="semestreCursando">Nivel de semestre</Label>
                        <Input id="semestreCursando" name="semestreCursando" type="number" required />
                    </div> */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Registrando..." : "Registrarse"}
                    </Button>
                </form>
            </div>
        </div>
    )
}