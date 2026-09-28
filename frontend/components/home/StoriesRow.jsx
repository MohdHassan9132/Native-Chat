import StoryItem from "./StoryItem";
import { STORIES } from "./data";

export default function StoriesRow() {
  return (
    <section className="mt-4 pl-5 shrink-0" aria-label="Stories">
      <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pr-5 py-1">
        {STORIES.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
