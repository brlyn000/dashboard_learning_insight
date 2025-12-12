-- CreateTable
CREATE TABLE "pomodoro_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "journey_id" TEXT,
    "duration_minutes" INTEGER NOT NULL DEFAULT 25,
    "completed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pomodoro_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_sessions_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
