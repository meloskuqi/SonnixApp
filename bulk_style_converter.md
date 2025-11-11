# Bulk Style Conversion Guide

## Common className to style conversions:

### Colors
```
className="bg-dark" → style={{ backgroundColor: '#0D0D0D' }}
className="bg-darkCard" → style={{ backgroundColor: '#1A1A1A' }}
className="bg-primary" → style={{ backgroundColor: '#7B2CBF' }}
className="text-white" → style={{ color: '#FFFFFF' }}
className="text-gray-400" → style={{ color: '#9CA3AF' }}
className="text-primary" → style={{ color: '#7B2CBF' }}
```

### Layout
```
className="flex-1" → style={{ flex: 1 }}
className="flex-row" → style={{ flexDirection: 'row' }}
className="items-center" → style={{ alignItems: 'center' }}
className="justify-center" → style={{ justifyContent: 'center' }}
className="justify-between" → style={{ justifyContent: 'space-between' }}
```

### Spacing
```
className="p-4" → style={{ padding: 16 }}
className="px-6" → style={{ paddingHorizontal: 24 }}
className="py-4" → style={{ paddingVertical: 16 }}
className="mb-4" → style={{ marginBottom: 16 }}
```

### Borders
```
className="rounded-xl" → style={{ borderRadius: 12 }}
className="rounded-2xl" → style={{ borderRadius: 16 }}
className="rounded-full" → style={{ borderRadius: 9999 }}
```

I'll now convert each screen file...



