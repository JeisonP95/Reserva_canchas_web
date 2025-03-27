## 📌 Subir Cambios al Repositorio

Sigue estos pasos para registrar y subir tus cambios a un repositorio Git:

### 1️⃣ Verificar el estado del repositorio
```sh
git status
```
Esto te mostrará los archivos modificados y pendientes de agregar.

### 2️⃣ Agregar los archivos al área de preparación
```sh
git add [archivo1] [archivo2]  # Agregar archivos específicos
git add .                      # Agregar todos los archivos modificados
```

### 3️⃣ Verificar los cambios añadidos
```sh
git status
```
Los archivos añadidos deben aparecer en color verde.

### 4️⃣ Confirmar los cambios con un mensaje
```sh
git commit -m "Descripción breve de los cambios realizados"
```

### 5️⃣ Subir los cambios al repositorio remoto
```sh
git push origin [rama] # el nombre de tu rama
```
Si estás en la rama principal (`main` o `master`), usa:
```sh
git push origin main  # O 'master' según el repositorio
```

✅ **¡Listo! Tus cambios han sido enviados al repositorio remoto.** 🚀

