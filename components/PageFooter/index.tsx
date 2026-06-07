import Emoji from "../Emoji";

function PageFooter() {
  return (
    <footer className="border-border mx-auto mt-auto flex w-[min(1180px,calc(100%-2rem))] flex-wrap justify-between gap-4 border-t py-6 max-[720px]:w-[min(100%-1rem,1180px)]">
      <div>
        <p className="text-muted mb-1 text-[0.72rem] tracking-[0.28em] uppercase">
          Independent reader
        </p>
        <p className="m-0 text-(--color-muted)">
          Made with <Emoji id="heart" /> by{" "}
          <a href="https://github.com/davbrito">davbrito</a>
        </p>
      </div>
      <p className="m-0 text-(--color-muted)">
        Read the code on <a href="https://github.com/davbrito/nius">GitHub</a>.
      </p>
    </footer>
  );
}

export default PageFooter;
