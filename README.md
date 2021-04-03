# Prisma-Schema-Tool README

This is a tool designed to convert models and fields in your prisma schema that are in snakeCase to camelCase using the prisma schema map attribute

## Reason

There might be situations where the columns in your SQL table are written using snake-case. eg user_id

But you might want to use the prisma api to interact with the field using snake case 

Example using:- 

```
prisma.findUnique({
    where:{
        userId:${something}
    }
})

Instead of

prisma.findUnique({
    where:{
        user_id:${something}
    }
})

```
## Or 

```
`model country {
  id           String    @id @default(cuid())
  alpha2_code  String    @unique
  alpha3_code  String    @unique
  name         String    @unique
  demonym      String?
  continent_id String
  continent    Continent @relation(fields: [continent_id], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}`

`model Continent {
  id           String    @id @default(cuid())
  name         String    @unique
  countries    Country[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
`


//convert the code above to the one below

`model country {
  id           String    @id @default(cuid())
  alpha2Code   String    @unique @map("alpha2_code")
  alpha3Code   String    @unique @map("alpha3_code")
  name         String    @unique
  demonym      String?
  continentId  String   @map("continent_id")
  continent    Continent @relation(fields: [continentId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
`
```
## How to use
- Right click on the prisma file which must end with the .prisma extension
- select Prisma Schema Convert menu option
- The file should be converted by now 

You can check out my blog [swacblooms](https://swacblooms.com/manipulate-the-prisma-schema-using-regex/) for details on this extension

### Contact
- sammychinedu2ky@gmail.com

# This repository is currently not up to speed with Prisma's development.
 So if you're seeing this now (3rd,APRIL,2021) or sometime in the future, It is actually deprecated.
 Thank you 😅
