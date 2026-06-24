<?php

namespace App\Services;

use Illuminate\Support\Str;

class CartService
{
    protected const SESSION_KEY = 'cart_items';

    /**
     * Get all cart items from session.
     */
    public function getItems(): array
    {
        return session(self::SESSION_KEY, []);
    }

    /**
     * Add an item to cart (or increase qty if same menu+options exist).
     */
    public function addItem(int $menuId, string $menuName, string $menuImage, float $menuPrice, int $quantity, array $options = [], int $cateringId = null, string $cateringName = null): array
    {
        $items = $this->getItems();

        // Check if same menu+options already exists
        foreach ($items as &$item) {
            if ($item['menu_id'] === $menuId && $item['options'] === $options) {
                $item['quantity'] += $quantity;
                session([self::SESSION_KEY => $items]);
                return $item;
            }
        }
        unset($item);

        // Add new item
        $item = [
            'id' => (string) Str::uuid(),
            'menu_id' => $menuId,
            'name' => $menuName,
            'image' => $menuImage,
            'price' => (float) $menuPrice,
            'quantity' => $quantity,
            'options' => $options,
            'catering_id' => $cateringId,
            'catering_name' => $cateringName,
            'checked' => true,
        ];

        $items[] = $item;
        session([self::SESSION_KEY => $items]);

        return $item;
    }

    /**
     * Update quantity of a cart item.
     */
    public function updateQuantity(string $itemId, int $quantity): bool
    {
        $items = $this->getItems();

        foreach ($items as &$item) {
            if ($item['id'] === $itemId) {
                if ($quantity <= 0) {
                    return $this->removeItem($itemId);
                }
                $item['quantity'] = $quantity;
                session([self::SESSION_KEY => $items]);
                return true;
            }
        }

        return false;
    }

    /**
     * Remove an item from cart.
     */
    public function removeItem(string $itemId): bool
    {
        $items = $this->getItems();
        $filtered = array_values(array_filter($items, fn($item) => $item['id'] !== $itemId));

        if (count($filtered) === count($items)) {
            return false;
        }

        session([self::SESSION_KEY => $filtered]);
        return true;
    }

    /**
     * Toggle checked state of a cart item.
     */
    public function toggleChecked(string $itemId): bool
    {
        $items = $this->getItems();

        foreach ($items as &$item) {
            if ($item['id'] === $itemId) {
                $item['checked'] = !($item['checked'] ?? true);
                session([self::SESSION_KEY => $items]);
                return true;
            }
        }

        return false;
    }

    /**
     * Get checked items (for checkout).
     */
    public function getCheckedItems(): array
    {
        return array_values(array_filter($this->getItems(), fn($item) => $item['checked'] ?? true));
    }

    /**
     * Calculate total price of all checked items.
     */
    public function getTotal(): float
    {
        $total = 0;
        foreach ($this->getCheckedItems() as $item) {
            $total += $item['price'] * $item['quantity'];
        }
        return $total;
    }

    /**
     * Get total item count (for badge).
     */
    public function getCount(): int
    {
        return array_sum(array_column($this->getItems(), 'quantity'));
    }

    /**
     * Clear the entire cart.
     */
    public function clear(): void
    {
        session([self::SESSION_KEY => []]);
    }
}
