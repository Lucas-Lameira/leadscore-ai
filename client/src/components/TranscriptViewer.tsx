interface TranscriptViewerProps {
  transcription: string;
}

export default function TranscriptViewer({ transcription }: TranscriptViewerProps) {
  const lines = transcription
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <div className="transcript-viewer">
      {lines.map((line, i) => {
        const isLeadLine = /^\[Lead/i.test(line);
        const speakerMatch = line.match(/^\[([^\]]+)\]:\s*(.*)/);

        if (speakerMatch) {
          const [, speaker, text] = speakerMatch;
          return (
            <div key={i} className="transcript-line">
              <span className={`transcript-speaker ${isLeadLine ? "lead" : ""}`}>
                [{speaker}]:
              </span>{" "}
              {text}
            </div>
          );
        }

        return (
          <div key={i} className="transcript-line">
            {line}
          </div>
        );
      })}
    </div>
  );
}
