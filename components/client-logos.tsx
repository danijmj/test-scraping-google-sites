import Image from "next/image"

export function ClientLogos() {
  return (
    <section className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-lg text-gray-600">Trusted by 25 of the Fortune 100</p>
        <div className="mt-8 flex justify-center space-x-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex h-16 w-40 items-center justify-center grayscale">
              <Image
                src={`/placeholder-logo-${i}.png`}
                alt={`Client logo ${i}`}
                width={160}
                height={64}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

