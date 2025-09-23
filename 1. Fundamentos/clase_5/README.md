# 📚 Comandos Esenciales de Git y Git Flow

## 🚀 **Configuración Inicial**

### Configuración de usuario
```bash
# Configurar nombre de usuario
git config --global user.name "Tu Nombre"

# Configurar email
git config --global user.email "tu.email@ejemplo.com"

# Ver configuración actual
git config --list

# Configurar editor por defecto (VSCode)
git config --global core.editor "code --wait"
```

## 📂 **Comandos Básicos de Git**

### Inicialización y clonación
```bash
# Inicializar un nuevo repositorio
git init 📁

# Clonar un repositorio existente
git clone <url-repositorio> 🏗️

# Clonar con autenticación SSH
git clone git@github.com:usuario/repositorio.git 🔐
```

### Estado y información
```bash
# Ver estado del working directory
git status 📊

# Ver historial de commits
git log 📜

# Ver historial compacto
git log --oneline --graph --all 🎯

# Ver cambios específicos en archivos
git diff 🔍

# Ver cambios preparados para commit
git diff --staged
```

### Trabajo con archivos
```bash
# Añadir archivo específico al staging
git add nombre-archivo.js ➕

# Añadir todos los archivos modificados
git add . 🗂️

# Añadir archivos interactivamente
git add -p 🎮

# Eliminar archivo del repositorio
git rm nombre-archivo.js 🗑️

# Mover/renombrar archivo
git mv archivo-viejo.js archivo-nuevo.js 🔄
```

### Commits
```bash
# Commit con mensaje
git commit -m "Mensaje descriptivo del commit" 💾

# Commit que incluye todos los archivos modificados (sin git add)
git commit -am "Mensaje del commit" ⚡

# Enmendar el último commit
git commit --amend ✏️

# Enmendar commit manteniendo mensaje anterior
git commit --amend --no-edit 🔄
```

### Ramas (Branches)
```bash
# Listar ramas locales
git branch 🌿

# Listar ramas locales y remotas
git branch -a 🌍

# Crear nueva rama
git branch nombre-rama 🆕

# Cambiar a rama existente
git checkout nombre-rama 🔀

# Crear y cambiar a nueva rama
git checkout -b nombre-rama 🚀

# Eliminar rama local
git branch -d nombre-rama ❌

# Eliminar rama forzadamente
git branch -D nombre-rama 💥

# Renombrar rama actual
git branch -m nuevo-nombre ✨
```

### Trabajo con remotos
```bash
# Añadir repositorio remoto
git remote add origin <url> 🔗

# Ver repositorios remotos
git remote -v 👀

# Descargar cambios del remoto sin merge
git fetch 📥

# Descargar cambios y hacer merge
git pull 🔄

# Subir cambios al remoto
git push 🚀

# Subir rama específica al remoto
git push -u origin nombre-rama 📤

# Eliminar rama remota
git push origin --delete nombre-rama 🗑️
```

## 🔄 **Trabajo Avanzado**

### Guardar cambios temporales
```bash
# Guardar cambios en stash
git stash 💾

# Listar stashes guardados
git stash list 📋

# Aplicar último stash
git stash apply 🔄

# Aplicar stash específico
git stash apply stash@{n} 🎯

# Crear nueva rama desde stash
git stash branch nueva-rama 🌱
```

### Revisión y corrección de historia
```bash
# Revertir commit específico
git revert <commit-hash> ↩️

# Rebase interactivo (últimos 3 commits)
git rebase -i HEAD~3 🎮

# Reset suave (mantiene cambios en working directory)
git reset --soft HEAD~1 ⏪

# Reset duro (pierde cambios)
git reset --hard HEAD~1 💥

# Limpiar archivos no trackeados
git clean -fd 🧹
```

### Etiquetas (Tags)
```bash
# Crear tag ligero
git tag v1.0.0 🏷️

# Crear tag anotado
git tag -a v1.0.0 -m "Versión 1.0.0" 📝

# Listar tags
git tag 📋

# Subir tags al remoto
git push --tags 🚀
```

## 🌊 **Git Flow - Flujo de Trabajo Estándar**

### Instalación e inicialización
```bash
# Instalar git-flow (Linux/Mac)
brew install git-flow

# Inicializar git-flow en proyecto
git flow init 🏁
```

### Ramas de características (Features)
```bash
# Crear nueva feature
git flow feature start mi-feature 🆕

# Finalizar feature (merge a develop)
git flow feature finish mi-feature ✅

# Publicar feature al repositorio remoto
git flow feature publish mi-feature 🌐

# Obtener feature publicada por otro desarrollador
git flow feature pull origin mi-feature 📥
```

### Ramas de releases
```bash
# Crear nueva release
git flow release start 1.2.0 🏷️

# Finalizar release (merge a main y develop)
git flow release finish 1.2.0 ✅

# Publicar release
git flow release publish 1.2.0 🚀
```

### Hotfixes (parches críticos)
```bash
# Crear hotfix desde main
git flow hotfix start 1.2.1 🔥

# Finalizar hotfix
git flow hotfix finish 1.2.1 ✅
```

## 🛠️ **Comandos de Depuración y Mantenimiento**

### Limpieza y optimización
```bash
# Optimizar repositorio
git gc 🧹

# Ver tamaño de archivos en repo
git count-objects -v 📊

# Ver espacio ocupado por archivos
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort --numeric-sort --key=2 | cut -c 1-12,41- | $(command -v gnumfmt || echo numfmt) --field=2 --to=iec-i --suffix=B --padding=7 --round=nearest
```

### Búsqueda e inspección
```bash
# Buscar en commits por mensaje
git log --grep="palabra-clave" 🔍

# Buscar cambios en código específico
git log -S "función-específica" 💻

# Ver quién modificó una línea
git blame archivo.js 👤

# Buscar archivo en toda la historia
git log --all --full-history -- "**/archivo-buscado.*" 🕵️
```

## 🎯 **Aliases Útiles para .gitconfig**

```ini
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    last = log -1 HEAD
    unstage = reset HEAD --
    lol = log --oneline --graph --all
    hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
    type = cat-file -t
    dump = cat-file -p
```

## 📖 **Flujo de Trabajo Recomendado**

### 1. **Flujo diario básico** 🔄
```bash
git status
git add .
git commit -m "descripción del cambio"
git pull origin main
git push origin mi-rama
```

### 2. **Cuando hay conflictos** ⚠️
```bash
git status                    # Identificar conflictos
git diff                      # Ver diferencias
# Editar archivos conflictivos
git add .                     # Marcar como resueltos
git commit -m "Resuelve conflictos"
```

### 3. **Antes de hacer push** ✅
```bash
git status
git log --oneline -5
git pull --rebase origin main
git push origin mi-rama
```

## 🚨 **Comandos Peligrosos (Usar con Precaución)**

```bash
# ⚠️ PERMANENTE: Elimina commits no alcanzables
git reset --hard <commit> 💥

# ⚠️ PERMANENTE: Sobrescribe historia remota
git push --force 🚫

# ⚠️ PERMANENTE: Elimina trabajo no guardado
git clean -fdx ☠️

# ⚠️ Reescribe historia pública (evitar)
git rebase -i main ❌
```

---

## 💡 **Consejos Importantes**

- ✅ **Siempre** haz `git status` antes de cualquier operación
- ✅ **Commit frecuente** con mensajes descriptivos
- ✅ **Nunca hacer force push** en ramas compartidas
- ✅ **Usar `--dry-run`** para probar comandos destructivos primero
- ✅ **Mantener el historial limpio** con rebase interactivo

¡Recuerda que la práctica hace al maestro! 🎓✨