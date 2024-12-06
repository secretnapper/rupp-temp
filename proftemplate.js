profTemplate = `
<li class="d-flex justify-content-between prof-row flex-wrap px-3 py-2 p-lg-4">
    <div class="prof-name me-auto">{0}, {1}</div>
    <div class="more-info d-flex my-auto flex-wrap">
        <div class="ratings d-flex my-auto text-center">
            <div class="rating-factor">
                <div class="mx-1 mx-lg-2 d-flex flex-column rating">
                    <span class="fw-bold">{2}</span>
                    <small>Helpfulness</small>
                </div>
                <div class="mx-1 mx-lg-2 d-flex flex-column rating">
                    <span class="fw-bold">{3}</span>
                    <small>Pedagogy</small>
                </div>
                <div class="mx-1 mx-lg-2 d-flex flex-column rating">
                    <span class="fw-bold">{4}</span>
                    <small>Easiness</small>
                </div>
            </div>
            <div class="mx-lg-2 d-flex flex-column rating overall">
                <span class="fw-bold">{5}</span>
                <small>Overall</small>
            </div>
        </div>
        <div class="ms-auto d-lg-block my-auto">
            <button id="{6}" class="review-button btn ms-auto">Show</button>
        </div>
    </div>
    <ul></ul>
</li>`