import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id?: string
  username?: string
  role?: "admin" | "user"
  // Add other user properties as needed
}

interface AuthContextProps {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string, isAdminLogin?: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAdmin: false,
  setAdmin: () => { },
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setAdmin] = useState<boolean>(() => {
    // Recuperar estado de localStorage si existe
    return localStorage.getItem("isAdmin") === "true";
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true"
  })

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    // Guardar en localStorage cuando cambie
    localStorage.setItem("isAdmin", isAdmin.toString())
    localStorage.setItem("isAuthenticated", isAuthenticated.toString())
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [isAdmin, isAuthenticated, user])

  const login = async (username: string, password: string, isAdminLogin = false): Promise<boolean> => {
    try {
      // Aquí deberías hacer una llamada a tu API para autenticar al usuario
      // Este es un ejemplo simplificado

      // Simulación de una llamada a API
      // En un caso real, esto sería una llamada fetch o axios a tu backend
      if (username && password) {
        // Simular un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Determinar si es admin basado en alguna lógica (ejemplo)
        const isUserAdmin = isAdminLogin ? true : username.includes("admin")

        // Establecer el estado de autenticación
        setIsAuthenticated(true)
        setAdmin(isUserAdmin)

        // Establecer datos del usuario
        setUser({
          id: "1",
          username,
          role: isUserAdmin ? "admin" : "user",
        })

        return true
      }
      return false
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{
      isAdmin,
      setAdmin,
      isAuthenticated,
      user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
