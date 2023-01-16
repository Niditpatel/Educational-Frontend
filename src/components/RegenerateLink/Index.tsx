import { RegenerateLink as RegenerateLinkService } from "../../AuthService";

export default function RegenerateLink(props: any) {
  async function handleRegenerateLink() {
    const res = await RegenerateLinkService({
      isFor: "activeaccount",
      token: props.token,
      id: props.id,
    });
    props.regenerateLinkResponse(res);
  }
  return (
    <>
      <div>
        <p className="">
          Link is expired please{" "}
          <button
            className="underline text-light1 active:text-primary"
            onClick={(e) => {
              e.preventDefault();
              handleRegenerateLink();
            }}
          >
            click Here
          </button>{" "}
          to regenerate Link
        </p>
      </div>
    </>
  );
}
