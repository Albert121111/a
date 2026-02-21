export function Footer() {
  return (
    <footer className="mt-20 border-t py-12">
      <div className="container grid gap-8 md:grid-cols-4 text-sm">
        <div><p className="font-semibold">Tiara Fitness Club</p><p>Москва, Примерная 10</p><p>06:00–23:00</p></div>
        <div><p className="font-semibold">Links</p><p>Schedule</p><p>Memberships</p></div>
        <div><p className="font-semibold">Contact</p><p>+7 (999) 123-45-67</p></div>
        <form className="space-y-2"><label htmlFor="news">Newsletter</label><input id="news" className="w-full border p-2" placeholder="Email"/><button className="bg-tiara px-3 py-2 text-white">Subscribe</button></form>
      </div>
    </footer>
  );
}
