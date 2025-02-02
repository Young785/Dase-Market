import { useState, useEffect } from 'react';
import { UsersAvater2, UsersAvater3, UsersAvater5 } from '../../../assets/images';
import ReactPlayer from 'react-player/lazy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
// import './socialPost.css'

export default function SocialPage() {
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState([]); // Store all posts
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
  



    const handleInputClick = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('openPostModal'));
        modal.show();
    };

    const openCommentClick = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('openCommentModal'));
        modal.show();
    };

    useEffect(() => {
        if (postContent.trim() !== "") {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [postContent]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedVideo(URL.createObjectURL(file));
        }
    };

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedAudio(URL.createObjectURL(file));
        }
    };

    const handlePostSubmission = () => {
        const newPost = {
            content: postContent,
            image: selectedImage,
            video: selectedVideo,
            audio: selectedAudio,
            profileImg: UsersAvater2,
            userName: "Anna Adame",
            createdAt: new Date().toLocaleDateString(),
        };

        setPosts([newPost, ...posts]); // Add new post to the top
        setPostContent(""); // Reset the content
        setSelectedImage(null); // Reset image
        setSelectedVideo(null); // Reset video
        setSelectedAudio(null); // Reset audio

        // const modal = new window.bootstrap.Modal(document.getElementById('openPostModal'));
        const modalElement = document.getElementById('openPostModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.hide();
        // modal.hide(); // Close modal
    };

    return (
        <>
            <div>
                <div className='layout-wrapper pt-0 mt-0'>
                    <div className="main-content pt-0 mt-0">
                        <div className="page-content mt-0">
                            <div className="container-fluid pt-0 mt-0">
                                <div className='col-lg-9 col-auto mx-auto pt-0 mt-0 ' style={{ overflowY: 'auto' }}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-2">
                                                <div className="col-lg-auto">
                                                    <div className="hstack gap-2">
                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Herbert">
                                                            <img src={UsersAvater2} alt="" className="rounded-circle avatar-xs" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-auto">
                                                    <div className="search-box">
                                                        <input
                                                            type="text"
                                                            className="form-control search cursor"
                                                            id="search-task-options"
                                                            placeholder="What's on your mind?"
                                                            onClick={handleInputClick}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row"></div>
                                        </div>
                                    </div>
                                   {/* Render posts dynamically */}
                                   {posts.map((post, index) => (
                                        <div key={index} className="card mb-4">
                                            <div className="card-header d-flex align-items-center gap-2">
                                                <img src={post.profileImg} alt="Profile" className="rounded-circle avatar-xs" />
                                                <div className="d-flex flex-column">
                                                    <span className="fw-bold">{post.userName}</span>
                                                    <span className="text-muted small">{post.createdAt}</span>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <p>{post.content}</p>
                                                {post.image && <img src={post.image} alt="Selected" className="img-fluid" />}
                                                {post.video && <ReactPlayer url={post.video} controls width="100%" height="100%" />}
                                                {post.audio && <ReactPlayer url={post.audio} controls width="100%" height="50px" />}
                                            </div>

                                            <div className="card-footer d-flex flex-column">
                                                <div className="text-muted small d-flex justify-content-between align-items-center">
                                                    <span className="cursor"><FontAwesomeIcon icon={faThumbsUp} /> 28K</span>
                                                    <div>
                                                        <span className="ms-3 cursor" onClick={openCommentClick}>660 Comments</span>
                                                        <span className="ms-3 cursor">335 Shares</span>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="text-muted small d-flex justify-content-between align-items-center">
                                                    <button className="btn btn-sm btn-link"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                                    <button onClick={openCommentClick} className="btn btn-sm btn-link"><FontAwesomeIcon icon={faComment} /> Comment</button>
                                                    <button className="btn btn-sm btn-link"><FontAwesomeIcon icon={faShare} /> Share</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                {/* Post Modal */}
                                <div className="modal fade" id="openPostModal" tabIndex="-1" aria-labelledby="openPostModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content border-0">
                                            <div className="modal-header p-3 bg-white-subtle border-bottom">
                                                <h5 className="modal-title text-center w-100" id="openPostModalLabel">Create Post</h5>
                                                <button type="button" className="btn-close" id="addBoardBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <img src={UsersAvater2} className="rounded-circle me-2" alt="User Profile" style={{ width: "40px", height: "40px;" }} />
                                                        <div>
                                                            <h6 className="mb-2">Anna Adame</h6>
                                                            <select className="form-select form-select-sm">
                                                                <option selected>Public</option>
                                                                <option value="1">Friends</option>
                                                                <option value="2">Only me</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="What's on your mind?"
                                                        rows="4"
                                                        value={postContent}
                                                        onChange={(e) => setPostContent(e.target.value)}
                                                    ></textarea>

                                                    <div className="media-preview mt-3">
                                                        {selectedImage && <img src={selectedImage} alt="Preview" className="img-fluid mb-2" />}
                                                        {selectedVideo && <ReactPlayer url={selectedVideo} controls width="100%" height="100%" />}
                                                        {selectedAudio && <ReactPlayer url={selectedAudio} controls width="100%" height="50px" />}
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center p-2 mt-3" style={{ borderRadius: '10px', border: '1px solid #999' }}>
                                                        <span>Add to your post</span>
                                                        <div className="d-flex">
                                                            <label className="btn btn-light ms-2">
                                                                <i className="ri-image-add-line"></i>
                                                                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                                                            </label>
                                                            <label className="btn btn-light ms-2">
                                                                <i className="ri-mic-line"></i>
                                                                <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleAudioChange} />
                                                            </label>
                                                            <label className="btn btn-light ms-2">
                                                                <i className="ri-video-line"></i>
                                                                <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoChange} />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className={`btn btn-primary w-100 ${isButtonActive ? "" : "disabled"}`}
                                                    onClick={handlePostSubmission}
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                



                                <div className="modal fade" id="openCommentModal" tabIndex="-1" aria-labelledby="openCommentModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content border-0">
                                            <div className="modal-header p-2 bg-white-subtle border-bottom">
                                                <h5 className="modal-title text-center w-100" id="openCommentModalLabel">Anna Adame Post</h5>
                                                <button type="button" className="btn-close" id="addBoardBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body " data-simplebar style={{heiht: "900px"}}>
                                                <div data-simplebar>

                                                    {/* Header Section */}
                                                    <div className="card-header d-flex align-items-to gap-2">
                                                        {/* <img 
                                                            src={UsersAvater2} 
                                                            alt="Profile" 
                                                            className="rounded-circle"
                                                        /> */}
                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Herbert">
                                                                        <img src={UsersAvater3} alt="" className="rounded-circle avatar-xs" />
                                                                    </a>
                                                        <div className="d-flex flex-column">
                                                            <span className="fw-bold">Babyfirsttv</span>
                                                            <span className="text-muted small">5 days ago</span>
                                                        </div>
                                                        
                                                    </div>

                                                    {/* Post Text with Emojis */}
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            <span role="img" aria-label="emojis">Hurray it's ma troublesome but lovely baby's birthday, happy birthday dearest 😉😘, wishing you more good life and celebration in greater heights, your secret prayers is answered,long life and prosperity is assured, enjoy your day to the fullest my love😍🥰👶</span> 
                                                            <span className="text-primary">#baby #babylove #cutebaby #cute #babyborn #newborn</span>
                                                        </p>
                                                        
                                                        {/* Content Section */}
                                                        <div className="position-relative">
                                                            <div className="embed-responsive embed-responsive-16by9">
                                                                <div className='player-wrapper'>
                                                                    <ReactPlayer
                                                                    className='react-player'
                                                                    url='https://www.youtube.com/shorts/7irVgzKW5X8?feature=share'
                                                                    width='100%'
                                                                    height='100%'
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Emojis overlay */}
                                                            <div className="position-absolute top-0 end-0 p-2">
                                                                {/* <span role="img" aria-label="emoji" className="fs-3">😭</span> */}
                                                                <span role="img" aria-label="emoji" className="fs-3">🙏</span>
                                                                <span role="img" aria-label="emoji" className="fs-3">🌹</span>
                                                            </div>

                                                            {/* Heart overlay */}
                                                            <div className="position-absolute bottom-0 start-0 p-2">
                                                                <span role="img" aria-label="heart" className="fs-2">❤️</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Interaction Section */}
                                                    <div className="card-footer d-flex flex-column">
                                                        <div className="text-muted small d-flex justify-content-between align-items-center">
                                                            <span className='cursor'><FontAwesomeIcon icon={faThumbsUp}  size="1x" color="#007bff" />28K</span>
                                                            
                                                            <div>

                                                                <span className="ms-3 cursor"> <a>660 Comments</a></span>
                                                                <span className="ms-3 cursor">335 Shares</span>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="text-muted small d-flex justify-content-between align-items-center">
                                                            <button className="btn btn-sm btn-link text-decoration-none gap-2 d-flex"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                                            <button  className="btn btn-sm btn-link text-decoration-none gap-2 d-flex"> <FontAwesomeIcon icon={faComment} />Comment</button>
                                                
                                                            <button className="btn btn-sm btn-link text-decoration-none gap-2 d-flex"> <FontAwesomeIcon icon={faShare} />Share</button>
                                                        </div>
                                                    </div>

                                                    <div className="card">
                                                        <div className="card-header align-items-center d-flex">
                                                            <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
                                                            <div className="flex-shrink-0">
                                                                <div className="dropdown card-header-dropdown">
                                                                    <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <span className="text-muted">Recent<i className="mdi mdi-chevron-down ms-1"></i></span>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <a className="dropdown-item" href="#">Recent</a>
                                                                        <a className="dropdown-item" href="#">Top Rated</a>
                                                                        <a className="dropdown-item" href="#">Previous</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="card-body">

                                                            <div data-simplebar style={{height: "300px"}} className="px-3 mx-n3 mb-2">
                                                                <div className="d-flex mb-4">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={UsersAvater2} alt="" className="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h5 className="fs-13">Joseph Parker <small className="text-muted ms-2">20 Dec 2021 - 05:47AM</small></h5>
                                                                        <p className="text-muted">I am getting message from customers that when they place order always get error message .</p>
                                                                        <a href="javascript: void(0);" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</a>
                                                                        <div className="d-flex mt-4">
                                                                            <div className="flex-shrink-0">
                                                                                <img src={UsersAvater3} alt="" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h5 className="fs-13">Alexis Clarke <small className="text-muted ms-2">22 Dec 2021 - 02:32PM</small></h5>
                                                                                <p className="text-muted">Please be sure to check your Spam mailbox to see if your email filters have identified the email from Dell as spam.</p>
                                                                                <a href="javascript: void(0);" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex mb-4">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={UsersAvater5} alt="" className="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h5 className="fs-13">Donald Palmer <small className="text-muted ms-2">24 Dec 2021 - 05:20PM</small></h5>
                                                                        <p className="text-muted">If you have further questions, please contact Customer Support from the “Action Menu” on your <a href="javascript:void(0);" className="text-decoration-underline">Online Order Support</a>.</p>
                                                                        <a href="javascript: void(0);" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</a>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={UsersAvater3} alt="" className="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h5 className="fs-13">Alexis Clarke <small className="text-muted ms-2">26 min ago</small></h5>
                                                                        <p className="text-muted">Your <a href="javascript:void(0)" className="text-decoration-underline">Online Order Support</a> provides you with the most current status of your order. To help manage your order refer to the “Action Menu” to initiate return, contact Customer Support and more.</p>
                                                                        <div className="row g-2 mb-3">
                                                                            <div className="col-lg-1 col-sm-2 col-6">
                                                                                <img src={UsersAvater2} alt="" className="img-fluid rounded"/>
                                                                            </div>
                                                                            <div className="col-lg-1 col-sm-2 col-6">
                                                                                <img src={UsersAvater5} alt="" className="img-fluid rounded"/>
                                                                            </div>
                                                                        </div>
                                                                        <a href="javascript: void(0);" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</a>
                                                                        <div className="d-flex mt-4">
                                                                            <div className="flex-shrink-0">
                                                                                <img src={UsersAvater2} alt="" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h5 className="fs-13">Donald Palmer <small className="text-muted ms-2">8 sec ago</small></h5>
                                                                                <p className="text-muted">Other shipping methods are available at checkout if you want your purchase delivered faster.</p>
                                                                                <a href="javascript: void(0);" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <form className="mt-4">
                                                                <div className="row g-3">
                                                                    <div className="col-12">
                                                                        <label for="exampleFormControlTextarea1" className="form-label text-body">Leave a Comments</label>
                                                                        <textarea className="form-control bg-light border-light" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your comment..."></textarea>
                                                                    </div>
                                                                    <div className="col-12 text-end">
                                                                        {/* <button type="button" className="btn btn-ghost-secondary btn-icon waves-effect me-1"><i className="ri-attachment-line fs-16"></i></button> */}
                                                                        <a href="javascript:void(0);" className="btn btn-success">Post Comments</a>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
