import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LockIcon } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempted with:', email, password)
        fetch('http://localhost:8080/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pass: password }), // Adjusted to match the expected request body
        })
            .then(response => {
                // Check if the response is OK (status 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON
            })
            .then(isLoginSuccessful => {
                if (isLoginSuccessful) {
                    // Handle successful login
                    console.log('Login successful');
                    window.location.href = '/home';
                    // Redirect or update state as needed
                } else {
                    // Handle login failure
                    console.error('Login failed');
                    setErrorMessage('Invalid email or password');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                setErrorMessage('An error occurred during login. Please try again.');
            });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <LockIcon className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tu correo y contraseña para iniciar sesión
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Display error message if any */}
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                        <Button className="w-full mt-4" type="submit">
                            Iniciar Sesión
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-center text-gray-500">
                        ¿No tienes una cuenta?{' '}
                        <a href="/sign-up" className="text-primary hover:underline">
                            Registrate
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
