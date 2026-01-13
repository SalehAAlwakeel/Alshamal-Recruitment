import Link from "next/link";

interface InquireSuccessPageProps {
  searchParams: Promise<{ maidId?: string }>;
}

export default async function InquireSuccessPage({
  searchParams,
}: InquireSuccessPageProps) {
  const { maidId } = await searchParams;
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Inquiry Submitted Successfully!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your inquiry. We will contact you shortly.
        </p>
        {maidId && (
          <p className="text-sm text-gray-600 mb-4">Helper ID: {maidId}</p>
        )}
        <div className="space-y-2">
          <Link
            href="/helpers"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse More Helpers
          </Link>
          <br />
          <Link
            href="/"
            className="inline-block text-primary-600 hover:text-primary-700 font-semibold"
          >
            Return to Home
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-green-200 text-sm text-gray-600">
          <p>
            {/* TODO: Integrate email/WhatsApp notification here */}
            You will receive a confirmation via phone or email shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

