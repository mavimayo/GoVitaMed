import React, { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function ErrorCard({
  error,
  onRetry,
  isLoading,
}: {
  error: unknown;
  isLoading?: boolean;
  onRetry?: () => void;
}) {
  console.log("errors ==>", error);
  async function onLogout() {
    // Add Logout logic here
  }
  // Check if unauthorized
  const isUnauthorized = useCallback((err: unknown): boolean => {
    if (axios.isAxiosError(err)) {
      return err.response?.status === 401;
    }
    return false;
  }, []);

  // Check if it's a network error (no response)
  const isNetworkError = useCallback((err: unknown): boolean => {
    if (axios.isAxiosError(err)) {
      // If error.response is undefined AND error.code is 'ERR_NETWORK', it's likely no network
      return !err.response && err.code === "ERR_NETWORK";
    }
    return false;
  }, []);

  // Get a display-friendly error message
  const getErrorMessage = useCallback((err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // If the server responded with something, show it
      if (err.response?.data?.message) {
        return err.response.data.message;
      }
      // Otherwise a generic server error
      return "An error occurred while communicating with the server.";
    }
    // If it’s a plain JS error
    if (err instanceof Error) {
      return err.message;
    }
    // Fallback
    return "An unexpected error occurred.";
  }, []);

  // Set initial error message
  const [message] = useState<string>(getErrorMessage(error));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-destructive">
          <AlertCircle className="mr-2 h-5 w-5" />
          Error
        </CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>

      {/* Show different buttons depending on the error */}
      <CardFooter className="flex items-center justify-center gap-x-3">
        {isUnauthorized(error) ? (
          // If 401, show logout button
          <Button
            onClick={onLogout}
            variant="outline"
            size="lg"
            disabled={isLoading}
          >
            Logout
          </Button>
        ) : isNetworkError(error) ? (
          // If network error, label it differently
          <>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="lg"
                disabled={isLoading}
              >
                <RefreshCcw
                  className={cn("mr-2 h-4 w-4", {
                    "animate-spin": isLoading,
                  })}
                />
                No Network – Try Again
              </Button>
            )}
          </>
        ) : (
          // If not 401 and not network error, show default “Try Again” (if provided)
          <>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="lg"
                disabled={isLoading}
              >
                <RefreshCcw
                  className={cn("mr-2 h-4 w-4", {
                    "animate-spin": isLoading,
                  })}
                />
                Try Again
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
