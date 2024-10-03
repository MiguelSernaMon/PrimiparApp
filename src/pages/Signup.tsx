'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

async function signUp(formData: FormData) {
    const response = await fetch('http://localhost:8080/api/usuarios', {
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

// Function to encode a string to Base64
function encodeString(input: string) {
    return btoa(input);
}

export default function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false)
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        formData.append('fechaRegistro', new Date().toISOString())
        formData.append('puntosLiga', '0')
        formData.append('foto', 'https://i.pravatar.cc/300')
        formData.append('biografia', 'biografia')
        formData.append('semestreCursando', '1')

        // Encode the password
        const password = formData.get('password')
        if (password) {
            formData.set('password', encodeString(password as string)); // Use set to overwrite the password
        }
        try {
            await signUp(formData)
            window.location.href = '/login'
        } catch (error) {
            console.error("Sign up error:", error)
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
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Registrando..." : "Registrarse"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
