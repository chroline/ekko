function ConvType() {
  return (
    <>
      <h1 className="inter-font-bold">What type of conversation?</h1>

      <div className="conv-type-card">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 50">
          <path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z"></path>
          <path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z"></path>
        </svg>
        <div>
          <p className="inter-font-med">AUDIO BASED</p>
          <p id="card-desc" className="inter-font-light">
            Speak with a personalized chat bot to practice vocalizing your conversations.
          </p>
        </div>
      </div>

      <div className="conv-type-card">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 50">
          <path d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2z"></path>
          <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
        </svg>
        <div>
          <p className="inter-font-med">AUDIO BASED</p>
          <p id="card-desc" className="inter-font-light">
            Speak with a personalized chat bot to practice vocalizing your conversations.
          </p>
        </div>
      </div>
    </>
  );
}

export default ConvType;
