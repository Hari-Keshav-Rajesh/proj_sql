const books = [
    {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        tags: ['fantasy', 'fiction'],
        stock: 10,
        rating: 4.75,
        description: 'A philosophical novel about a young Andalusian shepherd named Santiago who travels from Spain to Egypt in search of a treasure hidden in the pyramids.'
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        tags: ['fiction', 'drama'],
        stock: 15,
        rating: 4.2,
        description: 'A Pulitzer Prize-winning novel that explores racial injustice and moral growth through the eyes of a young girl named Scout Finch in the American South.'
    },
    {
        id: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        tags: ['fiction', 'classics'],
        stock: 20,
        rating: 4.5,
        description: 'A tragic love story set in the roaring 1920s, depicting the pursuit of wealth, decadence, and the American Dream through the eyes of Jay Gatsby.'
    },
    {
        id: 4,
        title: '1984',
        author: 'George Orwell',
        tags: ['fiction', 'dystopian'],
        stock: 12,
        rating: 4.1,
        description: 'A dystopian novel depicting a totalitarian society ruled by Big Brother, exploring themes of surveillance, censorship, and political control.'
    },
    {
        id: 5,
        title: 'Brave New World',
        author: 'Aldous Huxley',
        tags: ['science fiction', 'dystopian'],
        stock: 18,
        rating: 4.8,
        description: 'A futuristic dystopian novel set in a world where genetic engineering, psychological conditioning, and social hierarchy define a rigid society.'
    },
    {
        id: 6,
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        tags: ['fiction', 'coming-of-age'],
        stock: 30,
        rating: 4.0,
        description: 'A novel depicting the descent into savagery of a group of boys stranded on an uninhabited island, exploring themes of human nature and civilization.'
    },
    {
        id: 7,
        title: 'Lord of the Flies',
        author: 'William Golding',
        tags: ['fiction', 'classics'],
        stock: 25,
        rating: 4.3,
        description: 'A novel depicting the descent into savagery of a group of boys stranded on an uninhabited island, exploring themes of human nature and civilization.'
    },
    {
        id: 8,
        title: 'Animal Farm',
        author: 'George Orwell',
        tags: ['fiction', 'satire'],
        stock: 17,
        rating: 4.6,
        description: 'A satirical novella that allegorically portrays the Russian Revolution and totalitarianism, using farm animals to represent political figures and social classes.'
    },
    {
        id: 9,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        tags: ['fantasy', 'adventure'],
        stock: 22,
        rating: 4.9,
        description: 'A fantasy adventure novel about Bilbo Baggins, a hobbit who embarks on a quest with dwarves to reclaim their homeland from the dragon Smaug.'
    },
    {
        id: 10,
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        tags: ['fantasy', 'magic'],
        stock: 28,
        rating: 4.7,
        description: 'The first book in the Harry Potter series, following the adventures of a young wizard named Harry as he discovers his magical heritage and battles the dark wizard Voldemort.'
    },
    {
        id: 11,
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        tags: ['mystery', 'thriller'],
        stock: 16,
        rating: 3.9,
        description: 'A thriller novel that follows symbologist Robert Langdon as he investigates a murder at the Louvre and uncovers a conspiracy involving secret societies and religious history.'
    },
    {
        id: 12,
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        tags: ['science fiction', 'dystopian'],
        stock: 20,
        rating: 4.2,
        description: 'In a post-apocalyptic world, Katniss Everdeen volunteers to compete in the brutal Hunger Games, a televised event where tributes fight to the death for the amusement of the Capitol.'
    },
    {
        id: 13,
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        tags: ['mystery', 'thriller'],
        stock: 19,
        rating: 4.4,
        description: 'When Amy Dunne disappears on her fifth wedding anniversary, suspicion falls on her husband Nick. The story unfolds through alternating narratives, revealing dark secrets and twists.'
    },
    {
        id: 14,
        title: 'The Fault in Our Stars',
        author: 'John Green',
        tags: ['fiction', 'romance'],
        stock: 15,
        rating: 4.6,
        description: 'A heartwarming yet tragic romance between Hazel Grace Lancaster and Augustus Waters, two teenagers who meet at a cancer support group and embark on a journey of love and loss.'
    },
    {
        id: 15,
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        tags: ['mystery', 'thriller'],
        stock: 23,
        rating: 4.3,
        description: 'Journalist Mikael Blomkvist teams up with computer hacker Lisbeth Salander to solve the disappearance of Harriet Vanger, uncovering a complex web of family secrets and crimes.'
    },
    {
        id: 16,
        title: 'The Road',
        author: 'Cormac McCarthy',
        tags: ['fiction', 'post-apocalyptic'],
        stock: 10,
        rating: 4.1,
        description: 'A father and son journey through a desolate, post-apocalyptic landscape, struggling to survive while maintaining their humanity and hope in the face of harrowing challenges.'
    },
    {
        id: 17,
        title: 'The Shining',
        author: 'Stephen King',
        tags: ['horror'],
        stock: 27,
        rating: 4.9,
        description : 'Jack Torrance, a writer and recovering alcoholic, becomes the winter caretaker of the Overlook Hotel. As supernatural forces influence him, his son Danny experiences psychic visions of the hotel\'s dark past.'
    },
    {
        id: 18,
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        tags: ['fiction', 'drama'],
        stock: 14,
        rating: 4.2,
        description: 'Amir, haunted by guilt and regret, narrates the story of his childhood in Afghanistan and his complex relationship with Hassan, exploring themes of redemption, loyalty, and forgiveness.'
    },
    {
        id: 19,
        title: 'The Help',
        author: 'Kathryn Stockett',
        tags: ['fiction', 'historical'],
        stock: 18,
        rating: 4.5,
        description: 'Set in Mississippi during the civil rights movement, "The Help" follows Skeeter Phelan as she interviews African American maids, exposing racial injustices and the power of friendship.'
    },
    {
        id: 20,
        title: "The Handmaid's Tale",
        author: 'Margaret Atwood',
        tags: ['dystopian', 'feminism'],
        stock: 21,
        rating: 4.8,
        description: 'In the totalitarian society of Gilead, Offred is a Handmaid forced into reproductive servitude. Her struggle for survival and identity challenges the oppressive regime and gender norms.'
    },
    {
        id: 21,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        tags: ['fantasy', 'adventure'],
        stock: 30,
        rating: 4.7,
        description: 'Frodo Baggins embarks on a perilous journey to destroy the One Ring and defeat the dark lord Sauron. Along the way, he is joined by a fellowship of diverse companions in a battle for Middle-earth.'
    },
    {
        id: 22,
        title: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
        tags: ['fantasy'],
        stock: 25,
        rating: 4.4,
        description: 'Four siblings discover a magical wardrobe that leads to the enchanting land of Narnia. Their adventures include battles against the White Witch and encounters with mythical creatures.'
    },
    {
        id: 23,
        title: 'Divergent',
        author: 'Veronica Roth',
        tags: ['science fiction', 'dystopian'],
        stock: 16,
        rating: 4.3,
        description: 'In a divided society, Tris Prior discovers she is Divergent, possessing traits of multiple factions. As she navigates a dangerous initiation process, she uncovers secrets that threaten her world.'
    },
    {
        id: 24,
        title: 'The Martian',
        author: 'Andy Weir',
        tags: ['science fiction'],
        stock: 19,
        rating: 4.6,
        description: 'After being stranded on Mars, astronaut Mark Watney must use his ingenuity and scientific knowledge to survive and find a way to communicate with Earth for a chance at rescue.'
    },
    {
        id: 25,
        title: 'A Game of Thrones',
        author: 'George R.R. Martin',
        tags: ['fantasy', 'epic'],
        stock: 24,
        rating: 4.9,
        description: 'Noble families vie for control of the Seven Kingdoms in a gripping tale of political intrigue, power struggles, and epic battles set in a fantasy world of dragons, magic, and complex alliances.'
    },
    {
        id: 26,
        title: 'The Color Purple',
        author: 'Alice Walker',
        tags: ['fiction', 'drama'],
        stock: 17,
        rating: 4.5,
        description: 'Celie, an African American woman, navigates oppression and abuse in the South. Through her letters, she finds strength, love, and resilience amidst the challenges of racism and sexism.'
    },
    {
        id: 27,
        title: 'The Road Less Traveled',
        author: 'M. Scott Peck',
        tags: ['self-help'],
        stock: 12,
        rating: 4.2,
        description: 'A timeless guide to personal growth and spiritual development, offering insights and techniques for navigating the challenges of life, embracing responsibility, and finding fulfillment.'
    },
    {
        id: 28,
        title: 'The Girl on the Train',
        author: 'Paula Hawkins',
        tags: ['mystery', 'thriller'],
        stock: 22,
        rating: 4.4,
    },
    {
        id: 29,
        title: 'The Secret Garden',
        author: 'Frances Hodgson Burnett',
        tags: ['classics', 'children'],
        stock: 20,
        rating: 4.0,
    },
];

export default books;