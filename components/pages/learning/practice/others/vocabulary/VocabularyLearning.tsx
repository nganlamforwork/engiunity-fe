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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  clearCurrentSession,
  setCurrentSession,
} from "@/store/slice/sessionSlice";
import {
  useCreateSessionMutation,
  useGetAllSessionsQuery,
  useGetAllVocabulariesQuery,
} from "@/store/api/vocabulariesApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LeaveAlert } from "./components/leave-alert";
import { Loader2 } from "lucide-react";
import type { RootState } from "@/store";
import SessionCard from "./components/session-card";
import SessionDetail from "./components/session-detail";
import type { SessionDto } from "@/types/type";
import VocabularyList from "./components/vocabulary-list";
import { useToast } from "@/hooks/use-toast";

export default function VocabularyLearning() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [showNewSessionConfirm, setShowNewSessionConfirm] = useState(false);
  const [chosenSession, setChosenSession] = useState<number | undefined>();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);
  const [pendingTabChange, setPendingTabChange] = useState<string | null>(null);
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const session = useSelector(
    (state: RootState) => state.session.currentSession
  );
  const {
    data: sessionsData,
    isLoading: loadingSessions,
    refetch: refetchSessions,
  } = useGetAllSessionsQuery(userId, { skip: !userId });

  const {
    data: vocabularyData,
    isLoading: loadingVocabulary,
    refetch: refetchVocabularies,
  } = useGetAllVocabulariesQuery(userId, { skip: !userId });
  const [createSessionMutation, { isLoading: loading }] =
    useCreateSessionMutation();

  const handleCreateSessionClick = () => {
    // If there's an active session, show confirmation dialog
    if (session?.id && !session?.readOnly) {
      setShowNewSessionConfirm(true);
    } else {
      // Otherwise, create a new session directly
      handleCreateSession();
    }
  };

  const handleCreateSession = async () => {
    dispatch(clearCurrentSession());
    try {
      const response = await createSessionMutation({
        userId: Number(userId),
      }).unwrap();

      dispatch(
        setCurrentSession({
          userId: response.userId,
          id: response.id,
          readOnly: false,
        })
      );

      toast({
        title: "Session created",
        description: "New vocabulary learning session created successfully.",
      });
    } catch (error) {
      console.error("Failed to create session:", error);
      toast({
        title: "Error",
        description: "Failed to create a new session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChooseSession = (id: number) => {
    if (session?.id && !session?.readOnly) {
      setChosenSession(id);
      setShowLeaveAlert(true);
    } else {
      dispatch(
        setCurrentSession({
          userId: Number(userId),
          id: id,
          readOnly: true,
        })
      );
      setActiveTab("sessions");
    }
  };

  const handleConfirmLeave = () => {
    // Check if we're changing tabs or changing sessions
    if (pendingTabChange) {
      // We're changing tabs
      setActiveTab(pendingTabChange);
      setPendingTabChange(null);
      dispatch(clearCurrentSession());
    } else if (chosenSession) {
      // We're changing sessions
      dispatch(
        setCurrentSession({
          userId: Number(userId),
          id: chosenSession,
          readOnly: true,
        })
      );
      setActiveTab("sessions");
      setChosenSession(undefined);
    }

    // Close the leave alert
    setShowLeaveAlert(false);
  };

  const handleSetActiveTab = (value: string) => {
    // If switching away from sessions tab with an active non-readonly session
    if (
      activeTab === "sessions" &&
      value !== "sessions" &&
      session?.id &&
      !session?.readOnly
    ) {
      // Store the tab we want to navigate to
      setPendingTabChange(value);
      // Show confirmation dialog
      setShowLeaveAlert(true);
    } else {
      // Otherwise, just change the tab
      setActiveTab(value);
    }
  };

  useEffect(() => {
    dispatch(clearCurrentSession());
  }, []);

  useEffect(() => {
    if (activeTab === "history") {
      refetchSessions();
    } else if (activeTab === "vocabulary") {
      refetchVocabularies();
    }
  }, [activeTab, refetchSessions, refetchVocabularies]);

  return (
    <div className="space-y-8">
      <Tabs
        value={activeTab}
        onValueChange={handleSetActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sessions">Learning Sessions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="vocabulary">All Vocabulary</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Learning Sessions</CardTitle>

              <Button onClick={handleCreateSessionClick} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create New Session"
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {session?.id ? (
                <SessionDetail key={session.id} setActiveTab={setActiveTab} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No learning sessions yet. Press Create New Session to get
                    started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Learning History</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingSessions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !sessionsData ||
                !sessionsData.sessions ||
                sessionsData.sessions.length === 0 ? (
                <p className="text-muted-foreground">
                  No learning sessions yet. Create your first session to get
                  started.
                </p>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(sessionsData.sessions) &&
                    sessionsData.sessions.length > 0 &&
                    sessionsData.sessions.map((session: SessionDto) => (
                      <div
                        key={session.id}
                        onClick={() => handleChooseSession(session.id)}
                        className="cursor-pointer"
                      >
                        <SessionCard session={session} />
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vocabulary">
          <Card>
            <CardHeader>
              <CardTitle>All Vocabulary Words</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingVocabulary ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : vocabularyData && vocabularyData.vocabularies ? (
                <VocabularyList words={vocabularyData.vocabularies} />
              ) : (
                <p className="text-muted-foreground">
                  No vocabulary words found. Complete a vocabulary hunt to add
                  words.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog for New Session */}
      <AlertDialog
        open={showNewSessionConfirm}
        onOpenChange={setShowNewSessionConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Session?</AlertDialogTitle>
            <AlertDialogDescription>
              Creating a new session will close your current session. Any
              unsaved progress will be lost.
              {session?.readOnly
                ? " You are currently viewing a previous session."
                : " You have an active session in progress."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleCreateSession();
                setShowNewSessionConfirm(false);
              }}
            >
              Create New Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {hasUnsavedChanges && session?.id && !session?.readOnly && (
        <LeaveAlert
          message="You have unsaved changes in your vocabulary session. Are you sure you want to leave?"
          onConfirmLeave={handleConfirmLeave}
          showManually={showLeaveAlert}
          setShowManually={setShowLeaveAlert}
        />
      )}
    </div>
  );
}
