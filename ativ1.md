# Atividade 1

1. characters e users.
2. Sim, utilizei duas migrations. A primeira migration cria a tabela “characters” (contém coisas como nome do personagem, história, atributos, inventário), já a segunda cria a tabela “users” e adiciona a coluna “creator_id” à tabela characters.
3. backend/seed.sql
4. Os seguintes: Get /api/characters, Post /api/characters, Get /api/characters/…, Put /api/characters/…, Delete /api/characters/…; cada endpoint serve para uma funcionalidade essencial específica. O primeiro serve para listar as fichas de personagem armazenadas no banco de dados junto do que elas contém, o segunda serve para criar um nova ficha, o terceiro serve para mostrar uma ficha específica escolhida pelo usuário, o quarto serve para atualizar/modificar a ficha escolhida, e o último serve para deletar uma ficha escolhida. 
5. Sim, o Express.