<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Address;
use App\Models\Category;
use App\Models\Collection;
use App\Models\InventoryMovement;
use App\Models\JournalPost;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuraStoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Demo Customer & Staff User
        $customer = User::firstOrCreate(
            ['email' => 'jane@example.com'],
            [
                'name' => 'Jane Doe',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $admin = User::firstOrCreate(
            ['email' => 'admin@auraandoak.com'],
            [
                'name' => 'Atelier Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Default Address for Demo Customer
        $address = Address::firstOrCreate(
            ['user_id' => $customer->id, 'address_line_1' => '123 Greenway Blvd'],
            [
                'type' => 'shipping',
                'first_name' => 'Jane',
                'last_name' => 'Doe',
                'email' => 'jane@example.com',
                'phone' => '+254712345678',
                'address_line_2' => 'Apt 4B',
                'city' => 'Nairobi',
                'state' => 'Nairobi County',
                'postal_code' => '00100',
                'country' => 'KE',
                'is_default' => true,
            ]
        );

        // 3. Categories
        $categoriesData = [
            [
                'name' => 'Knitwear & Tops',
                'slug' => 'knitwear-tops',
                'description' => 'Lightweight organic linens, fine-gauge merino knits, and relaxed tailored shirts.',
                'image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Dresses',
                'slug' => 'dresses',
                'description' => 'Flowing silhouettes and effortless daytime cuts in natural botanical dyes.',
                'image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Outerwear',
                'slug' => 'outerwear',
                'description' => 'Timeless tailored coats, raw wool trenches, and structured blazers.',
                'image' => 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Pants & Skirts',
                'slug' => 'pants-skirts',
                'description' => 'High-waisted trousers, pleated linen culottes, and versatile everyday bottoms.',
                'image' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Handcrafted canvas totes, vegetal tanned mules, and woven silk scarves.',
                'image' => 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop',
            ],
        ];

        $categories = [];
        foreach ($categoriesData as $catData) {
            $categories[$catData['slug']] = Category::firstOrCreate(
                ['slug' => $catData['slug']],
                $catData
            );
        }

        // 4. Curated Collections
        $autumnCollection = Collection::firstOrCreate(
            ['slug' => 'autumn-atelier'],
            [
                'name' => 'The Autumn Atelier',
                'description' => 'Rich earth tones and insulating organic textures crafted for cooler mornings.',
                'hero_image' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
                'is_active' => true,
            ]
        );

        $linenCollection = Collection::firstOrCreate(
            ['slug' => 'conscious-linen'],
            [
                'name' => 'Conscious Linen Capsule',
                'description' => 'Breathable European flax woven by historic heritage weavers.',
                'hero_image' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
                'is_active' => true,
            ]
        );

        $essentialsCollection = Collection::firstOrCreate(
            ['slug' => 'minimalist-essentials'],
            [
                'name' => 'Minimalist Essentials',
                'description' => 'Understated wardrobe cornerstones designed to be worn on repeat.',
                'hero_image' => 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
                'is_active' => true,
            ]
        );

        // 5. Products Catalog
        $productsData = [
            [
                'name' => 'Relaxed Linen Shirt',
                'slug' => 'relaxed-linen-shirt',
                'category_slug' => 'knitwear-tops',
                'short_description' => 'A relaxed, breezy everyday shirt tailored from pure breathable French flax.',
                'full_description' => 'Our signature Relaxed Linen Shirt embodies timeless atelier dressing. Cut in a generous drape from sustainably cultivated French flax linen, each shirt undergoes an enzymatic pre-wash for an ultra-soft handle from day one. Features genuine mother-of-pearl buttons and clean french seams throughout.',
                'base_price' => 75.00,
                'compare_at_price' => 95.00,
                'primary_image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1200&auto=format&fit=crop',
                ],
                'materials' => '100% Certified European Flax Linen (180 GSM)',
                'care_instructions' => 'Machine wash cold on gentle cycle. Line dry in shade. Warm iron if desired.',
                'badge' => 'New Arrival',
                'rating' => 4.90,
                'reviews_count' => 38,
                'variants' => [
                    ['color' => 'Sage Green', 'color_hex' => '#5A6B65', 'size' => 'S', 'stock' => 15, 'price_adjustment' => 0],
                    ['color' => 'Sage Green', 'color_hex' => '#5A6B65', 'size' => 'M', 'stock' => 24, 'price_adjustment' => 0],
                    ['color' => 'Sage Green', 'color_hex' => '#5A6B65', 'size' => 'L', 'stock' => 18, 'price_adjustment' => 0],
                    ['color' => 'Sand White', 'color_hex' => '#DCE4DE', 'size' => 'S', 'stock' => 12, 'price_adjustment' => 0],
                    ['color' => 'Sand White', 'color_hex' => '#DCE4DE', 'size' => 'M', 'stock' => 20, 'price_adjustment' => 0],
                    ['color' => 'Sand White', 'color_hex' => '#DCE4DE', 'size' => 'L', 'stock' => 9, 'price_adjustment' => 0],
                    ['color' => 'Slate Green', 'color_hex' => '#2C3634', 'size' => 'M', 'stock' => 14, 'price_adjustment' => 0],
                ],
                'collections' => [$autumnCollection, $linenCollection, $essentialsCollection],
            ],
            [
                'name' => 'Artisan Canvas Tote',
                'slug' => 'artisan-canvas-tote',
                'category_slug' => 'accessories',
                'short_description' => 'Heavyweight organic cotton duck tote with vegetable-tanned bridle leather straps.',
                'full_description' => 'Designed for daily errands and studio work alike. Cut from 18oz unbleached organic cotton canvas, reinforced with copper rivets at stress points, and finished with double-stitched leather handles that soften beautifully with time.',
                'base_price' => 85.00,
                'compare_at_price' => null,
                'primary_image' => 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&auto=format&fit=crop',
                ],
                'materials' => '100% Organic Cotton Canvas (18oz), Italian Bridle Leather',
                'care_instructions' => 'Spot clean with damp cloth and gentle soap. Condition leather annually.',
                'badge' => 'Trending Now',
                'rating' => 4.95,
                'reviews_count' => 64,
                'variants' => [
                    ['color' => 'Natural Sand', 'color_hex' => '#DCE4DE', 'size' => 'One Size', 'stock' => 30, 'price_adjustment' => 0],
                    ['color' => 'Slate', 'color_hex' => '#2C3634', 'size' => 'One Size', 'stock' => 22, 'price_adjustment' => 0],
                ],
                'collections' => [$essentialsCollection],
            ],
            [
                'name' => 'Tailored Wool Trench',
                'slug' => 'tailored-wool-trench',
                'category_slug' => 'outerwear',
                'short_description' => 'Double-breasted outerwear staple in warm, naturally water-repellent virgin wool.',
                'full_description' => 'An architectural long coat tailored with a storm flap, deep welt pockets, and a removable tie belt. Woven from mulesing-free virgin wool that provides weather-resistant insulation with zero bulk.',
                'base_price' => 280.00,
                'compare_at_price' => 320.00,
                'primary_image' => 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
                ],
                'materials' => '100% Mulesing-Free Virgin Wool, Cupro Lining',
                'care_instructions' => 'Specialist eco dry clean only.',
                'badge' => 'Sustainable',
                'rating' => 5.00,
                'reviews_count' => 19,
                'variants' => [
                    ['color' => 'Slate Green', 'color_hex' => '#2C3634', 'size' => 'S', 'stock' => 8, 'price_adjustment' => 0],
                    ['color' => 'Slate Green', 'color_hex' => '#2C3634', 'size' => 'M', 'stock' => 12, 'price_adjustment' => 0],
                    ['color' => 'Slate Green', 'color_hex' => '#2C3634', 'size' => 'L', 'stock' => 6, 'price_adjustment' => 0],
                ],
                'collections' => [$autumnCollection],
            ],
            [
                'name' => 'Organic Cotton Trouser',
                'slug' => 'organic-cotton-trouser',
                'category_slug' => 'pants-skirts',
                'short_description' => 'High-waisted wide-leg trousers tailored with deep front pleats.',
                'full_description' => 'Effortlessly polished. These trousers feature a high-rise waist with tailored belt loops, slant hip pockets, and a generous straight-leg silhouette that pairs seamlessly with minimalist shirting.',
                'base_price' => 110.00,
                'compare_at_price' => null,
                'primary_image' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
                ],
                'materials' => '100% GOTS-Certified Organic Cotton Twill',
                'care_instructions' => 'Machine wash cold inside out. Hang dry to preserve fabric drape.',
                'badge' => 'Organic',
                'rating' => 4.85,
                'reviews_count' => 27,
                'variants' => [
                    ['color' => 'Moss Stone', 'color_hex' => '#5A6B65', 'size' => '28', 'stock' => 10, 'price_adjustment' => 0],
                    ['color' => 'Moss Stone', 'color_hex' => '#5A6B65', 'size' => '30', 'stock' => 14, 'price_adjustment' => 0],
                    ['color' => 'Moss Stone', 'color_hex' => '#5A6B65', 'size' => '32', 'stock' => 12, 'price_adjustment' => 0],
                ],
                'collections' => [$essentialsCollection],
            ],
            [
                'name' => 'Merino Wool Knit Sweater',
                'slug' => 'merino-wool-knit-sweater',
                'category_slug' => 'knitwear-tops',
                'short_description' => 'Chunky rib-knit crewneck sweater spun from superfine Australian merino wool.',
                'full_description' => 'Warmth without weight. Features a classic crew neckline, raglan sleeves, and substantial ribbed trims at cuffs and hem.',
                'base_price' => 145.00,
                'compare_at_price' => 170.00,
                'primary_image' => 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
                ],
                'materials' => '100% Superfine Merino Wool (19.5 micron)',
                'care_instructions' => 'Hand wash lukewarm with wool detergent. Dry flat on towel.',
                'badge' => 'Best Seller',
                'rating' => 4.92,
                'reviews_count' => 52,
                'variants' => [
                    ['color' => 'Oatmeal', 'color_hex' => '#DCE4DE', 'size' => 'S', 'stock' => 11, 'price_adjustment' => 0],
                    ['color' => 'Oatmeal', 'color_hex' => '#DCE4DE', 'size' => 'M', 'stock' => 19, 'price_adjustment' => 0],
                    ['color' => 'Oatmeal', 'color_hex' => '#DCE4DE', 'size' => 'L', 'stock' => 8, 'price_adjustment' => 0],
                ],
                'collections' => [$autumnCollection],
            ],
            [
                'name' => 'Pleated Linen Maxi Dress',
                'slug' => 'pleated-linen-maxi-dress',
                'category_slug' => 'dresses',
                'short_description' => 'Architectural floor-length dress featuring gentle waist gathers and side seam pockets.',
                'full_description' => 'Understated elegance. Crafted with a discreet keyhole neckline, relaxed dropped shoulders, and subtle side slits for graceful movement.',
                'base_price' => 190.00,
                'compare_at_price' => 220.00,
                'primary_image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
                ],
                'materials' => '100% Normandy Flax Linen',
                'care_instructions' => 'Gentle cold wash. Line dry in ambient breeze.',
                'badge' => 'New Arrival',
                'rating' => 4.88,
                'reviews_count' => 21,
                'variants' => [
                    ['color' => 'Sage', 'color_hex' => '#5A6B65', 'size' => 'XS', 'stock' => 6, 'price_adjustment' => 0],
                    ['color' => 'Sage', 'color_hex' => '#5A6B65', 'size' => 'S', 'stock' => 15, 'price_adjustment' => 0],
                    ['color' => 'Sage', 'color_hex' => '#5A6B65', 'size' => 'M', 'stock' => 12, 'price_adjustment' => 0],
                ],
                'collections' => [$linenCollection],
            ],
        ];

        foreach ($productsData as $data) {
            $category = $categories[$data['category_slug']];

            $product = Product::firstOrCreate(
                ['slug' => $data['slug']],
                [
                    'category_id' => $category->id,
                    'name' => $data['name'],
                    'short_description' => $data['short_description'],
                    'full_description' => $data['full_description'],
                    'base_price' => $data['base_price'],
                    'compare_at_price' => $data['compare_at_price'],
                    'primary_image' => $data['primary_image'],
                    'gallery_images' => $data['gallery_images'],
                    'materials' => $data['materials'],
                    'care_instructions' => $data['care_instructions'],
                    'badge' => $data['badge'],
                    'rating' => $data['rating'],
                    'reviews_count' => $data['reviews_count'],
                    'is_active' => true,
                ]
            );

            // Attach collections
            if (isset($data['collections'])) {
                foreach ($data['collections'] as $collection) {
                    $product->collections()->syncWithoutDetaching([$collection->id]);
                }
            }

            // Create variants
            foreach ($data['variants'] as $varData) {
                $sku = strtoupper(Str::slug($product->name.'-'.$varData['color'].'-'.$varData['size']));
                $variant = ProductVariant::firstOrCreate(
                    ['sku' => $sku],
                    [
                        'product_id' => $product->id,
                        'color' => $varData['color'],
                        'color_hex' => $varData['color_hex'],
                        'size' => $varData['size'],
                        'price_adjustment' => $varData['price_adjustment'],
                        'stock_count' => $varData['stock'],
                    ]
                );

                // Initial inventory log
                InventoryMovement::firstOrCreate(
                    [
                        'product_variant_id' => $variant->id,
                        'reason' => 'initial_stock_seed',
                    ],
                    [
                        'quantity_change' => $varData['stock'],
                    ]
                );
            }
        }

        // 6. Seed a Sample Order for Jane Doe
        $firstVariant = ProductVariant::first();
        if ($firstVariant) {
            $order = Order::firstOrCreate(
                ['order_number' => 'AO-84920'],
                [
                    'user_id' => $customer->id,
                    'email' => 'jane@example.com',
                    'phone' => '+254712345678',
                    'shipping_address_id' => $address->id,
                    'billing_address_id' => $address->id,
                    'status' => OrderStatus::Confirmed,
                    'subtotal' => 160.00,
                    'shipping_cost' => 0.00,
                    'tax_amount' => 25.60,
                    'discount_amount' => 0.00,
                    'total' => 185.60,
                    'shipping_method' => 'standard',
                    'payment_status' => PaymentStatus::Paid,
                    'payment_method' => PaymentMethod::Mpesa,
                    'payment_reference' => 'QA12345678',
                    'notes' => 'Deliver to front porch.',
                ]
            );

            OrderItem::firstOrCreate(
                [
                    'order_id' => $order->id,
                    'product_variant_id' => $firstVariant->id,
                ],
                [
                    'product_name' => $firstVariant->product->name,
                    'variant_name' => "{$firstVariant->color} / {$firstVariant->size}",
                    'sku' => $firstVariant->sku,
                    'unit_price' => $firstVariant->finalPrice(),
                    'quantity' => 2,
                    'total_price' => $firstVariant->finalPrice() * 2,
                ]
            );
        }

        // 7. Seed Journal Posts
        $journalArticles = [
            [
                'title' => 'The Art of Slow Fashion: Why Less is More',
                'slug' => 'the-art-of-slow-fashion-why-less-is-more',
                'category' => 'Sustainability',
                'read_time' => '5 Min Read',
                'is_featured' => true,
                'featured_image' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
                'excerpt' => 'In a world of fast trends and disposable clothing, we explore the profound impact of slowing down our consumption habits and curating intentional silhouettes.',
                'body' => "In an era characterized by hyper-speed fashion micro-cycles, stepping off the consumption treadmill is both an act of defiance and a gesture of stewardship. When we choose garments designed for longevity, we honor the natural fibers, the skilled hands at the loom, and the quiet dignity of repetition.\n\nA capsule wardrobe is not about restriction; it is about absolute clarity. When every piece in your wardrobe harmonizes effortlessly with the next, dressing becomes a calm, centered ritual rather than a daily negotiation with clutter.",
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'A Guide to Caring for Pure Organic Linen',
                'slug' => 'a-guide-to-caring-for-pure-organic-linen',
                'category' => 'Style Guides',
                'read_time' => '4 Min Read',
                'is_featured' => false,
                'featured_image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
                'excerpt' => 'Practical wisdom on washing, drying, and embracing the natural, lived-in texture of heirloom linen garments.',
                'body' => "Linen is one of humanity's oldest cultivated fibers, and its resilience is legendary. Far from needing delicate chemical intervention, flax responds best to gentle water, natural soap, and open air. Embracing its organic drape and relaxed creases is part of the tactile joy of slow dressing.",
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Behind the Seams: The Hands That Craft Our Pieces',
                'slug' => 'behind-the-seams-the-hands-that-craft-our-pieces',
                'category' => 'Behind the Seams',
                'read_time' => '7 Min Read',
                'is_featured' => false,
                'featured_image' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
                'excerpt' => 'A visit to our family-run artisan partners who weave, cut, and finish each Aura & Oak garment with generational mastery.',
                'body' => 'We traveled deep into the weaving heartlands to sit with master weavers whose craft spans four generations. From yarn-spinning to the final horn button stitch, see the care and craftsmanship poured into each production run.',
                'published_at' => now()->subDays(20),
            ],
        ];

        foreach ($journalArticles as $article) {
            JournalPost::firstOrCreate(
                ['slug' => $article['slug']],
                $article
            );
        }
    }
}
