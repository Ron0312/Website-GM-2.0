## 2026-01-28 - Mobile Accessibility for Hover Actions
**Learning:** Icon-only buttons that rely on `opacity-0 group-hover:opacity-100` are inaccessible on touch devices and for keyboard users.
**Action:** Use `opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100` to ensure visibility on mobile (default) and focus (keyboard), while maintaining the clean hover effect on desktop.
