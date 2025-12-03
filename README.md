# 🐝 Bees - Bijenwaarnemingen App

Een Next.js applicatie voor het beheren en bijhouden van bijenwaarnemingen, bijenkorven en bijenkasten.

## 📋 Project Overzicht

Deze applicatie maakt het mogelijk voor gebruikers om:

- Bijenkasten (apiaries) te registreren en beheren
- Bijenkorven (hives) toe te voegen en te monitoren
- Waarnemingen (observations) bij te houden
- Planten te koppelen aan bijenkasten
- Admin functionaliteiten voor het beheren van alle data

## 🚀 Getting Started

### Installatie

1. Clone de repository
2. Installeer dependencies:

```bash
npm install
```

3. Configureer de database:

```bash
npx prisma generate
npx prisma migrate dev
```

4. Start de development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in je browser

## 🔐 Test Accounts

### Gebruiker Account

- **Email:** lola@test.com
- **Wachtwoord:** lola123456

### Admin Account

- **Email:** admin@example.com
- **Wachtwoord:** test@123

## 🗂️ Project Structuur

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migraties
├── public/
│   ├── assets/                # Afbeeldingen en media
│   └── icons/                 # Icons
├── src/
│   ├── app/
│   │   ├── about/            # Over ons pagina
│   │   ├── account/          # Gebruiker account paginas
│   │   ├── actions/          # Server actions
│   │   ├── admin/            # Admin dashboard
│   │   ├── api/              # API routes
│   │   └── auth/             # Authenticatie paginas
│   ├── components/
│   │   ├── auth/             # Auth componenten
│   │   ├── forms/            # Formulieren
│   │   ├── home/             # Home componenten
│   │   └── shared/           # Gedeelde componenten
│   ├── lib/
│   │   ├── auth-helpers.ts   # Auth helper functies
│   │   ├── auth-options.ts   # NextAuth configuratie
│   │   ├── client.ts         # Prisma client
│   │   └── validators/       # Zod schemas
│   ├── styles/               # CSS bestanden
│   └── types/                # TypeScript types
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Database:** PostgreSQL met Prisma ORM
- **Authenticatie:** NextAuth.js
- **Validatie:** Zod
- **Styling:** Custom CSS
- **TypeScript**

## 📊 Database Schema

Belangrijkste entiteiten:

- **User** - Gebruikers
- **Apiary** - Bijenkasten (locaties)
- **Hive** - Bijenkorven
- **Observation** - Waarnemingen
- **Plant** - Planten
- **ApiaryPlant** - Koppeling tussen apiaries en planten

## 🔒 Authenticatie & Autorisatie

De app gebruikt NextAuth.js met credential-based authenticatie. Er zijn twee rollen:

- **USER** - Standaard gebruiker
- **ADMIN** - Administrator met volledige toegang

Middleware beschermt routes op basis van authenticatie en autorisatie.

## 📝 Belangrijke Features

- ✅ User registratie en login
- ✅ CRUD operaties voor apiaries, hives en observations
- ✅ Admin dashboard voor alle data
- ✅ Koppeling van planten aan apiaries
- ✅ Responsive design
- ✅ Form validatie met Zod
- ✅ Protected routes met middleware

## 🧪 Development

```bash
# Development server
npm run dev

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma Client

# Build
npm run build
npm start
```
