import React from 'react';
function Collapse({ id, title, children }) {
    return (<>
        <p class="d-inline-flex px-5">
            <a class="btn fs-5 border anchor-collapse text-start"
                data-bs-toggle="collapse"
                href={`#${id}`}
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample">
                {title}
            </a>

        </p>
        <div class="collapse px-5 mb-2" id={id}>
            <div class="card card-body">
                {children}
            </div>
        </div>
    </>);
}

export default Collapse;