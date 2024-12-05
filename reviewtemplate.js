reviewTemplate = `
<li class="mt-3">
    <div class="row d-block d-lg-flex p-lg-3 p-4 mx-0">
        <div class="col-lg-10 col order-lg-2 ps-lg-3">
            <div class="my-3 my-lg-0">
                {0}
            </div>
        </div>
        <div class='divider d-block d-lg-none mb-2 mt-5'></div>
        <div class="col-lg-2 col order-lg-1">
            <div>
                <div class="d-flex d-lg-block justify-content-between my-3 mt-lg-0">
                    <div>Year: {1}</div>
                    <div>Class: {2}</div>
                    <div>Average Quality: {3}</div>
                </div>
                <div class="star-show">
                    <div class="d-flex flex-lg-column justify-content-between flex-row">
                        <div class="d-flex flex-column flex-lg-row justify-content-between">
                            <div class="my-auto">Helpfulness:</div>
                            <div class="star my-auto">{4}</div>
                        </div>
                        <div class="d-flex flex-column flex-lg-row justify-content-between">
                            <div class="my-auto">Pedagogy:</div>
                            <div class="star my-auto">{5}</div>
                       </div>
                        <div class="d-flex flex-column flex-lg-row justify-content-between">
                            <div class="my-auto">Easiness:</div>
                            <div class="star my-auto">{6}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`