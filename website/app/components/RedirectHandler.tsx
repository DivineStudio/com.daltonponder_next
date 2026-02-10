"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter } from "../../i18n/routing";

export function RedirectHandler() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useLayoutEffect(() => {
    if (window.location.hash === "#contactForm") {
      setIsRedirecting(true);
      router.replace("/contact");
    }
  }, [router]);

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--background)] flex items-center justify-center">
        {/* Optional: Add a loading spinner here if desired */}
      </div>
    );
  }

  return null;
}
