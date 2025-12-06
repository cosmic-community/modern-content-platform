export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  type: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, any>;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    avatar?: CosmicImage;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    excerpt: string;
    content: string; // The markdown content is typically here based on model, or in base content
    hero_image: CosmicImage;
    author: Author;
    categories: Category[];
  };
}

// Ensure the type is correct for markdown based on the provided sample
// Sample shows "content" in metadata for markdown content in Posts