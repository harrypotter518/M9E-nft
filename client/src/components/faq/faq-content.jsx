import Faqs from "./faqs";

export const FaqContent = (props) => {

  return (
    <div id="faqContent" className="text-center">
      <div className="container">
        <div>
          <div className="faq-title">
            <h1>FAQ</h1>
          </div>
            <div className="faqs">
              <Faqs/>
            </div>
        </div>
      </div>
    </div>
  );
};
