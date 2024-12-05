profTemplate = `
<li class="d-flex justify-content-between prof-row flex-wrap p-3 p-lg-4">
    <div class="prof-name me-auto">{0}, {1}</div>
    <div class="more-info d-flex my-auto">
        <div class="ratings d-lg-flex mx-auto my-auto text-center d-none">
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
            <div class="mx-1 mx-lg-2 d-flex flex-column rating">
                <span class="fw-bold">{5}</span>
                <small>Overall</small>
            </div>
        </div>
        <div class="ms-lg-3 d-flex">
            <button id="{6}" class="review-button btn ms-auto">Show</button>
        </div>
    </div>
    <ul></ul>
</li>`