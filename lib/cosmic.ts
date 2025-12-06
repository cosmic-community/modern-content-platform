import { createBucketClient } from '@cosmicjs/sdk';
import { Post, Author, Category } from './types';

const COSMIC_BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG || '';
const COSMIC_READ_KEY = process.env.COSMIC_READ_KEY || '';

if (!COSMIC_BUCKET_SLUG) {
  console.warn('COSMIC_BUCKET_SLUG is missing in environment variables');
}

export const cosmic = createBucketClient({
  bucketSlug: COSMIC_BUCKET_SLUG,
  readKey: COSMIC_READ_KEY,
  apiEnvironment: "staging"
});

// Helper for handling errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    // Sort manually as .sort() might not be available in all SDK versions or behaving as expected
    const posts = (response.objects as Post[]) || [];
    return posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
      
    return (response.objects as Author[]) || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching authors:', error);
    return [];
  }
}

export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    console.error(`Error fetching author ${slug}:`, error);
    return null;
  }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId 
      })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return (response.objects as Post[]) || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching author posts:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
      
    return (response.objects as Category[]) || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.categories': categoryId 
      })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return (response.objects as Post[]) || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching category posts:', error);
    return [];
  }
}