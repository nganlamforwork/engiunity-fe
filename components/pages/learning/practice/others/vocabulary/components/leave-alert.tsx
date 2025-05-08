"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

interface LeaveAlertProps {
  message?: string;
  onConfirmLeave?: () => void;
  onCancelLeave?: () => void;
  showManually?: boolean;
  setShowManually?: (show: boolean) => void;
}

export function LeaveAlert({
  message = "You have unsaved changes. Are you sure you want to leave?",
  onConfirmLeave,
  onCancelLeave,
  showManually = false,
  setShowManually,
}: LeaveAlertProps) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  // Handle browser's native beforeunload event (closing tab, typing new URL)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle browser back button and programmatic navigation
  useEffect(() => {
    // Save the current URL to compare later
    const currentUrl = window.location.href;

    // Create a history state entry to detect back button
    window.history.pushState(null, "", currentUrl);

    const handlePopState = (event: PopStateEvent) => {
      // When back button is pressed, this will fire
      event.preventDefault();

      // Store the URL we would navigate to
      setNextUrl(document.referrer || "/");

      // Show confirmation dialog
      setShowDialog(true);

      // Push another state to prevent immediate navigation
      window.history.pushState(null, "", currentUrl);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handle manual showing of the dialog
  useEffect(() => {
    if (showManually) {
      setShowDialog(true);
    }
  }, [showManually]);

  // Handle dialog close
  const handleDialogClose = (confirmed: boolean) => {
    setShowDialog(false);

    // If manually triggered, update the parent state
    if (setShowManually) {
      setShowManually(false);
    }

    if (confirmed) {
      // User confirmed leaving
      if (onConfirmLeave) {
        onConfirmLeave();
      }

      // If we have a next URL (from back button), navigate to it
      if (nextUrl) {
        window.location.href = nextUrl;
      }
    } else {
      // User canceled
      if (onCancelLeave) {
        onCancelLeave();
      }
    }

    // Reset the next URL
    setNextUrl(null);
  };

  return (
    <AlertDialog
      open={showDialog}
      onOpenChange={(open) => !open && handleDialogClose(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave this page?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleDialogClose(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDialogClose(true)}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
