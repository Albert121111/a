export default function Contact() {
  return <div className="container py-12"><h1 className="text-4xl">Контакты</h1><iframe className="mt-6 w-full h-80 border" src="https://www.openstreetmap.org/export/embed.html" /><form className="mt-6 grid gap-2 max-w-xl"><input className="border p-2" placeholder="Имя"/><input className="border p-2" placeholder="Email"/><textarea className="border p-2" placeholder="Вопрос"/><button className="bg-tiara text-white px-4 py-2 w-fit">Отправить</button></form></div>;
}
