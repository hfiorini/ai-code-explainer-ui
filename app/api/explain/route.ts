export async function POST(req: Request) {
  const body = await req.json();

  // Proxy al backend Go
  const res = await fetch('http://localhost:8080/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.text(); // el backend devuelve texto de Ollama
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
