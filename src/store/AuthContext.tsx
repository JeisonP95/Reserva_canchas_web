import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAdmin: false,
  setAdmin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setAdmin] = useState<boolean>(() => {
    // Recuperar estado de localStorage si existe
    return localStorage.getItem("isAdmin") === "true";
  });

  useEffect(() => {
    // Guardar en localStorage cuando cambie
    localStorage.setItem("isAdmin", isAdmin.toString());
  }, [isAdmin]);

  return (
    <AuthContext.Provider value={{ isAdmin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
