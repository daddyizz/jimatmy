import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

export function PwaManager() {
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => void navigator.serviceWorker.register("/sw.js"));
    }
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
      if (localStorage.getItem("jimatmy-install-dismissed") !== "yes") setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  if (!visible || !installEvent) return null;

  return (
    <aside className="fixed bottom-36 left-4 right-4 z-40 mx-auto max-w-sm rounded-2xl border border-border bg-card p-4 shadow-raised">
      <button
        type="button"
        className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground"
        aria-label="Tutup cadangan pemasangan"
        onClick={() => {
          localStorage.setItem("jimatmy-install-dismissed", "yes");
          setVisible(false);
        }}
      >
        <X className="h-4 w-4" />
      </button>
      <p className="pr-7 font-extrabold">Pasang aplikasi JimatMY</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Akses lebih pantas terus dari skrin utama telefon.
      </p>
      <button
        type="button"
        className="admin-primary mt-3 w-full"
        onClick={async () => {
          await installEvent.prompt();
          await installEvent.userChoice;
          setVisible(false);
        }}
      >
        <Download className="h-4 w-4" /> Pasang Sekarang
      </button>
    </aside>
  );
}
