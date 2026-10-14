// Shared in-memory database for local fallback when Supabase is not available
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
const DEFAULT_ADMIN_HASH = String(bcrypt.hashSync('admin123', SALT_ROUNDS));

export const mockUsers = new Map();
mockUsers.set('admin@grazel.com', {
  id: 'admin_001',
  email: 'admin@grazel.com',
  name: 'Grazel Admin',
  role: 'admin',
  password_hash: DEFAULT_ADMIN_HASH,
  created_at: new Date().toISOString(),
});


export const mockOrders = [];
export const mockReviews = [
  {
    id: 'rev_seed_1',
    product_id: '1',
    productId: '1',
    user_id: 'usr_001',
    customer_name: 'Alexander V.',
    customerName: 'Alexander V.',
    rating: 5,
    title: 'Impeccable craftsmanship and fit',
    comment: 'The wool feels remarkably luxurious and the cut is modern yet timeless. Wore it to a gallery opening and received multiple compliments.',
    is_approved: true,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'rev_seed_2',
    product_id: '1',
    productId: '1',
    user_id: 'usr_002',
    customer_name: 'Julian M.',
    customerName: 'Julian M.',
    rating: 5,
    title: 'Worth every penny',
    comment: 'Exceptional tailoring. Shoulder fit is precise and the horn buttons add an understated elegance.',
    is_approved: true,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 'rev_seed_3',
    product_id: '2',
    productId: '2',
    user_id: 'usr_003',
    customer_name: 'Marcus K.',
    customerName: 'Marcus K.',
    rating: 5,
    title: 'Pure indulgence',
    comment: 'Sublimely soft cashmere. Has maintained its shape through multiple wears without any pilling.',
    is_approved: true,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'rev_seed_4',
    product_id: '2',
    productId: '2',
    user_id: 'usr_004',
    customer_name: 'Liam T.',
    customerName: 'Liam T.',
    rating: 4,
    title: 'Great staple sweater',
    comment: 'Warm and lightweight. The navy tone is deep and rich. Highly recommended.',
    is_approved: true,
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: 'rev_seed_5',
    product_id: '3',
    productId: '3',
    user_id: 'usr_005',
    customer_name: 'Ethan P.',
    customerName: 'Ethan P.',
    rating: 5,
    title: 'Crisp and breathable',
    comment: 'The cotton weave is sturdy yet extremely comfortable for long business days.',
    is_approved: true,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'rev_seed_6',
    product_id: '4',
    productId: '4',
    user_id: 'usr_006',
    customer_name: 'David R.',
    customerName: 'David R.',
    rating: 5,
    title: 'Flawless drape',
    comment: 'The pleating adds great movement and structure. Fits true to size with a clean break at the ankles.',
    is_approved: true,
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'rev_seed_7',
    product_id: '5',
    productId: '5',
    user_id: 'usr_007',
    customer_name: 'Sophia L.',
    customerName: 'Sophia L.',
    rating: 5,
    title: 'Stunning silhouette',
    comment: 'Fabric feels wonderful against the skin and the cut is effortlessly flattering.',
    is_approved: true,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];


export const defaultSizeGuides = [
  // Top size guide
  {
    id: 'sg_top_s',
    product_type: 'top',
    size_code: 'S',
    unit: 'cm',
    measurements: { chest: '92', waist: '82', hip: '94', shoulder: '42' },
    is_active: true
  },
  {
    id: 'sg_top_m',
    product_type: 'top',
    size_code: 'M',
    unit: 'cm',
    measurements: { chest: '96', waist: '86', hip: '98', shoulder: '44' },
    is_active: true
  },
  {
    id: 'sg_top_l',
    product_type: 'top',
    size_code: 'L',
    unit: 'cm',
    measurements: { chest: '100', waist: '90', hip: '102', shoulder: '46' },
    is_active: true
  },
  {
    id: 'sg_top_xl',
    product_type: 'top',
    size_code: 'XL',
    unit: 'cm',
    measurements: { chest: '104', waist: '94', hip: '106', shoulder: '48' },
    is_active: true
  },
  
  // Bottom size guide
  {
    id: 'sg_bottom_30',
    product_type: 'bottom',
    size_code: '30',
    unit: 'cm',
    measurements: { waist: '76', hip: '94', inseam: '78', outseam: '102' },
    is_active: true
  },
  {
    id: 'sg_bottom_32',
    product_type: 'bottom',
    size_code: '32',
    unit: 'cm',
    measurements: { waist: '81', hip: '99', inseam: '79', outseam: '103' },
    is_active: true
  },
  {
    id: 'sg_bottom_34',
    product_type: 'bottom',
    size_code: '34',
    unit: 'cm',
    measurements: { waist: '86', hip: '104', inseam: '80', outseam: '104' },
    is_active: true
  },
  
  // Dress size guide
  {
    id: 'sg_dress_s',
    product_type: 'dress',
    size_code: 'S',
    unit: 'cm',
    measurements: { chest: '88', waist: '68', hip: '94', length: '110' },
    is_active: true
  },
  {
    id: 'sg_dress_m',
    product_type: 'dress',
    size_code: 'M',
    unit: 'cm',
    measurements: { chest: '92', waist: '72', hip: '98', length: '112' },
    is_active: true
  },
  {
    id: 'sg_dress_l',
    product_type: 'dress',
    size_code: 'L',
    unit: 'cm',
    measurements: { chest: '96', waist: '76', hip: '102', length: '114' },
    is_active: true
  }
];

export let mockSizeGuides = [...defaultSizeGuides];

export function resetMockSizeGuides() {
  mockSizeGuides = [...defaultSizeGuides];
}
