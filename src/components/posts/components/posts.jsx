"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import config from "../../../../config";
import axiosInstance from "../../../axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import bus from "../../../bus";
import toast from "react-hot-toast";
// import SideBar from '../dashboard_header/sidebar'
// import Footer from "../../../components/dashboard_header/footer";
// import DataTable from "@/app/streamers/table/table.js";
import LiveSelect from "react-select";
import LoadingIcons from "react-loading-icons";
import { fullNameDateFormat } from "../../../../useDateFormat";
import '../../dashboard/profile/style.css'
import SocialFeed from '../../dashboard/social/SocialFeed'

export default function Posts() {
  const [downloadedPosts, setDownloadedPosts] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ChannelId, setChannelId] = useState(null);
  const [DeletePostId, setDeletePostId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [PostID, setPostID] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // const [editCatIds, setEditCatIds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [Channels, setChannels] = useState([]);
  const [selectedChannelOption, setSelectedChannelOption] = useState(null);
  const [musicDetails, setMusicDetails] = useState({ name: "", size: "" });
  const [selectedFileImage, setSelectedFileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [IsPostsLoading, setIsPostsLoading] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // State to track open dropdown index
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const [selectedFileAudio, setSelectedFileAudio] = useState(null);
  const validTypes = ["image/png", "image/jpg", "image/jpeg"];
  let getAuth = JSON.parse(localStorage.getItem("auth_data"));
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [visibility, setVisibility] = useState("private");

  useEffect(() => {
    getAuth = JSON.parse(localStorage.getItem("auth_data"));
    // console.log('getAuth in post', getAuth);
    if (getAuth?.user && getAuth?.user?.active_channel !== null) {
      setChannelId(getAuth?.user?.active_channel);
    }
    checkData();
    fetchChannelsList();
  }, []);

  const checkData = () => {
    const storedData = JSON.parse(localStorage.getItem("auth_data"));
    if (storedData?.user?.active_channel) {
      setActiveChannelId(storedData.user.active_channel);
    }
  };

  const fetchChannelsList = async () => {
    setIsPostsLoading(true);

    try {
      const response = await axiosInstance.get(`/accounts/channels`);
      if (response.status < 300) {
        const data = response.data;
        setChannels(data.data.channels);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsPostsLoading(false);
    }
  };


  // const handleSavePlaylists = async () => {
  //   try {
  //     // Check if currentPostId is set
  //     if (!currentPostId) {
  //       toast.error("No post selected.");
  //       return;
  //     }

  //     // Prepare the payload for the API call
  //     const payload = {
  //       post_id: currentPostId,
  //       playlist_ids: selectedPlaylists, 
  //       is_new: "NO"
  //     };

  //     // Make a single API call to save all selected playlists
  //     const response = await axiosInstance.post(`${config.BASE_URL}/accounts/channels/playlists/items/add`, payload);

  //     if (!response.data.success) {
  //       toast.error(`Failed to save to playlist: ${response.data.message}`);
  //       return; 
  //     }

  //     toast.success("Playlists saved successfully!");
  //   } catch (error) {
  //     toast.error("Failed to save playlists.");
  //     console.error("Error saving playlists:", error);
  //   }
  // };

  const handlePlaylistChange = async (playlistId) => {
    const isAdding = !selectedPlaylists.includes(playlistId);

    // Update the state optimistically
    setSelectedPlaylists((prev) =>
      isAdding ? [...prev, playlistId] : prev.filter((id) => id !== playlistId)
    );

    try {
      if (!currentPostId) {
        toast.error("No post selected.");
        return;
      }

      const payload = {
        post_id: currentPostId,
        playlist_id: playlistId,
        is_new: "NO",
      };

      const response = await axiosInstance.post(`/accounts/channels/playlists/items/add`, payload);

      if (response.data.status === true) {
        toast.success(response.data.message);
      } else {
        toast.error(`Failed to ${isAdding ? "add" : "remove"} playlist: ${response.data.message}`);
        // Revert state if API call fails
        setSelectedPlaylists((prev) =>
          isAdding ? prev.filter((id) => id !== playlistId) : [...prev, playlistId]
        );
      }
    } catch (error) {
      toast.error(`Failed to ${isAdding ? "add" : "remove"} playlist.`);
      console.error("Error saving playlist:", error);

      // Revert state on error
      setSelectedPlaylists((prev) =>
        isAdding ? prev.filter((id) => id !== playlistId) : [...prev, playlistId]
      );
    }
  };


  const handleChannelChange = (e) => {
    const value = e.value;
    const label = e.label;
    setSelectedChannelOption({ label: label, value: value });

    // console.log("Selected Channel details:", selectedChannelOption);
    setChannelId(value);
  };

  const handleResetCreateFields = () => {
    setChannelId("");
    setName("");
    setDescription("");
    setSelectedFileImage("");
    setSelectedFileAudio("");
    setSelectedImage("");
    setMusicDetails({ name: "", size: "" });
    setSelectedChannelOption("");
  };

  const handleFormSubmit = async () => {
    const getAuth = JSON.parse(localStorage.getItem("auth_data"));

    if (getAuth) {
      // setChannelId(getAuth.user.active_channel);
      console.log("Selected Channel details:", selectedChannelOption);
      setChannelId(selectedChannelOption.value)
      if (modalTitle === "Create Post") {
        let payload = {
          // channel_id: getAuth.user.active_channel,
          channel_id: selectedChannelOption.value,
          title: name,
          description: description,
          image: selectedFileImage,
          audio: selectedFileAudio,
        };

        console.log("create payload", payload);

        if (
          !ChannelId ||
          !name ||
          !description ||
          !selectedFileImage ||
          !selectedFileAudio
        ) {
          toast.error("Kindly fill all fields to proceed");
          return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("title", name);
        formData.append("channel_id", ChannelId);
        formData.append("description", description);
        formData.append("image", selectedFileImage);
        formData.append("audio", selectedFileAudio);

        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });

        try {
          const response = await axiosInstance.post(`/accounts/channels/posts/create`, formData);

          if (response.status < 300) {
            setName("");
            setDescription("");
            setSelectedChannelOption("");
            setChannelId("");
            setSelectedFileImage("");
            setSelectedImage("");
            setSelectedFileAudio("");
            toast.success(response.data.message);
            // toast.success(`Post created successfully!`);
            bus.emit("modal_close", true);
          } else {
            toast.success(response.data.message);
          }
        } catch (error) {
          const errorResponse = error.response?.data;
          const errorMessage =
            errorResponse?.message ||
            "An error occurred while creating the post.";

          toast.error(`${errorMessage}`);
          // notifyError(errorMessage);
          console.error("Error creating post:", errorResponse);
        } finally {
          setLoading(false);
        }
      } else if (modalTitle === "Edit Post") {
        let edit_payload = {
          title: name,
          description: description,
        };

        if (selectedFileImage instanceof File) {
          edit_payload.image = selectedFileImage;
        }

        if (selectedFileAudio instanceof File) {
          edit_payload.audio = selectedFileAudio;
        }

        // console.log("edit payload", edit_payload);

        if (!name || !description || !selectedFileImage || !selectedFileAudio) {
          toast.error("Kindly fill all fields to proceed");
          return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("title", name);
        formData.append("description", description);

        if (selectedFileImage instanceof File) {
          formData.append("image", selectedFileImage);
        }

        if (selectedFileAudio instanceof File) {
          formData.append("audio", selectedFileAudio);
        }

        // console.log('formData:', formData);

        try {
          const data = JSON.parse(localStorage.getItem("auth_data"));

          if (data && data.access_token) {
            const response = await axiosInstance.put(`/accounts/channels/posts/edit/${PostID}`, edit_payload);

            if (response.status < 300) {
              setName("");
              setDescription("");
              setSelectedChannelOption("");
              setChannelId("");
              setSelectedFileImage("");
              setSelectedImage("");
              setSelectedFileAudio("");
              toast.success(response.data.message);
              // toast.success(`Post created successfully!`);
              bus.emit("modal_close", true);
            } else {
              toast.success(response.data.message);
            }
          }
        } catch (error) {
          const errorResponse = error.response?.data;
          const errorMessage =
            errorResponse?.message ||
            "An error occurred while creating the post.";

          toast.error(`${errorMessage}`);
          // notifyError(errorMessage);
          console.error("Error creating post:", errorResponse);
        } finally {
          setLoading(false);

          setTimeout(() => { }, 1000);
        }
      }
    }
  };

  const fetchPostsList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/accounts/channels/posts`, {
        params: { search: searchTerm || "", status: "ACTIVE" },
      });
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const fetchedPosts = response.data.data.map((post) => ({
        id: post.id,
        postId: post.post_id,
        channelId: post.channel_id,
        accountId: post.account_id,
        title: post.title,
        slug: post.slug,
        description: post.description,
        image: post.image?.startsWith('http') ? post.image : `${(import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')}/${post.image}`,
        audio: post.audio?.startsWith('http') ? post.audio : `${(import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')}/${post.audio}`,
        status: post.status === "ACTIVE" ? "Active" : "Inactive",
        totalViews: post.views,
        createdAt: post.created_at,
      }));

      setData(fetchedPosts);

      const emittedPostAudio = response.data.data.map((post) => ({
        id: post.id,
        title: post.title,
        tags: [post.slug],
        image: `${config.SERVER_URL}/${post.image}`,
        url: `${config.SERVER_URL}/${post.audio}`,
        channel_id: post.channel_id,
        channel_name: post.channel.name,
        channel_tag: post.channel.tag,
        channel_image: post.channel.image,
      }));

      if (emittedPostAudio) {
        bus.emit("emitted_audio_array", emittedPostAudio);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchPostsListAndUpdate = async () => {
      try {
        await fetchPostsList();
        bus.emit("modal_close", false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // fetchCategories();
    fetchPostsList();

    const handleModalClose = (val) => {
      if (val) {
        fetchPostsListAndUpdate();
      }
    };

    bus.on("modal_close", handleModalClose);

    // Cleanup the event listener on unmount or when searchTerm changes
    return () => {
      bus.off("modal_close", handleModalClose);
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    // console.log('event.target.value', event.target.value, Number(event.target.value));
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedFilteredData = useMemo(() => {
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      if (sortOption === "name") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortOption === "date") {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      // else if (sortOption === "tag") {
      //   return sortOrder === "asc"
      //     ? a.tag.localeCompare(b.tag)
      //     : b.tag.localeCompare(a.tag);
      // }
      return 0;
    });

    return sortedData;
  }, [searchTerm, sortOption, sortOrder, data]);

  const totalPages = Math.ceil(sortedFilteredData.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedFilteredData.slice(startIndex, endIndex);
  }, [currentPage, sortedFilteredData, itemsPerPage]);

  const handleClick = (event, page) => {
    event.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleCategoryInputKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value) {
      const newValue = event.target.value.trim();
      const existingCategory = categories.find(
        (category) => category.label.toLowerCase() === newValue.toLowerCase()
      );

      if (!existingCategory) {
        const newCategory = { value: newValue, label: newValue };
        setCategories([...categories, newCategory]);
        setSelectedCategories([...selectedCategories, newCategory]);
      }

      setInputValue("");
      event.preventDefault();
    }
  };

  // Image Select Functions

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && validTypes.includes(file.type)) {
      if (file.size > 3000 * 1024) {
        // 3MB in bytes
        setErrorMessage("File size should not exceed 3MB");
        toast.error("File size should not exceed 3MB");

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const uploadedUrl = URL.createObjectURL(file);

      setSelectedImage(uploadedUrl);
      setSelectedFileImage(file);
      setErrorMessage("");
    } else {
      setSelectedFileImage(null);
      setSelectedImage(null);
      setErrorMessage("Please select a png, jpg or jpeg file only.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && validTypes.includes(file.type)) {
      if (file.size > 3000 * 1024) {
        // 3MB in bytes
        toast.error("File size should not exceed 3MB");
        return;
      }

      const uploadedUrl = URL.createObjectURL(file);

      setSelectedImage(uploadedUrl);
      setSelectedFileImage(file);
    } else {
      setSelectedFileImage(null);
      setSelectedImage(null);
      toast.error("Please select a png, jpg or jpeg file only.");
    }
  };

  const handleRemoveFile = () => {
    setSelectedImage(null);
    setSelectedFileImage(null);
  };

  // Audio Select Functions

  const handleDragOverAudio = (event) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    event.stopPropagation();
  };

  const handleDropAudio = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFileChangeAudio(files);
  };

  const handleFileChangeAudio = (files) => {
    if (files.length === 0) return;
    const file = files[0];

    // Accept only audio files
    if (!file.type.startsWith("audio/")) {
      toast.error("Only audio files are accepted");
      return;
    }

    // const fileURL = URL.createObjectURL(file);
    setSelectedFileAudio(file);
    setMusicDetails({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
    });
  };

  const handleRemoveFileAudio = () => {
    setSelectedFileAudio(null);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown state
  };

  const handleOptionClick = (text, item) => {
    setIsDropdownOpen(false); // Close dropdown when an option is clicked
    setOpenDropdownIndex(null);
    if (text === "delete") {
      // console.log('item to be deleted:', item.postId);
      setDeletePostId(item.postId);
      setIsDeleteDialogOpen(!isDeleteDialogOpen);
      setOpenDropdownIndex(null);
    } else if (text === "edit") {
      setModalTitle("Edit Post");
      setModalButtonText("Update Post");
      // console.log('selected item:', item, item.channelId);
      setName(item.title);
      let matchedchannelId = item.channelId;
      // console.log('Channels arr:', Channels);

      const matchedIndustry = Channels.find(
        (ch) => ch.channel_id === matchedchannelId
      );
      // console.log('matchedIndustry:', matchedIndustry);

      // const value = e.value;
      // const label = e.label;
      // console.log("Selected Channel details:", label, value);
      // setChannelId(value);

      setChannelId(item.channelId);
      setPostID(item.postId);
      setDescription(item.description);
      setSelectedFileImage(item.image);
      setSelectedFileAudio(item.audio);
      setSelectedImage(item.image);
      setMusicDetails({ name: "", size: "" });
      setSelectedChannelOption({
        label: matchedIndustry.name,
        value: matchedIndustry.channel_id,
      });
    }
  };

  const handleConfirmDelete = async (val) => {
    setIsDeleteDialogOpen(false);
    if (val === true) {
      setIsDeleting(true);
      // console.log('DeletePostId', DeletePostId);

      try {
      const response = await axiosInstance.delete(`/accounts/channels/posts/delete/${DeletePostId}`);

        if (response.status === 200) {
          toast.success(response.data.message);
          setDeletePostId(null);
          fetchPostsList();
        } else {
          if (response.data && response.data.message) {
            toast.error(response.data.message);
          } else {
            toast.error("Failed to delete channel.");
          }
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          console.error("Failed to delete channel:", error);
          toast.error("Failed to delete channel.");
        }
      } finally {
        setIsDeleting(false);
      }
    } else {
      setDeletePostId(null);
    }
  };

  const handlePostButtonClick = (event, index) => {
    event.preventDefault();
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the specific dropdown
  };

  const handlePostOptionClick = (action, postObj) => {
    setOpenDropdownIndex(null); // Close the dropdown when an option is clicked

    if (action === 'save') {
      // Handle save to playlist
      const savedPlaylists = JSON.parse(localStorage.getItem('savedPlaylists')) || [];

      // Check for duplicates
      const isDuplicate = savedPlaylists.some(item =>
        item.id === postObj.id &&
        item.title === postObj.title
      );
      console.log('savedPlaylists', savedPlaylists, isDuplicate);
      if (!isDuplicate) {
        savedPlaylists.push(postObj);
        localStorage.setItem('savedPlaylists', JSON.stringify(savedPlaylists));
        toast.success('Post added to playlist');
      } else {
        toast.error("Post already in playlist");
      }

    } else if (action === "download") {
      // Logic to download the post
      // For example, you might want to fetch the audio file and save it
      // Here we just simulate adding to downloaded posts
      setDownloadedPosts(prev => [...prev, postObj.id]); // Assuming post has an id
      toast.success('Download successful!')
    }
  };

  const handleCloseDrop = () => {
    if (openDropdownIndex !== null) setOpenDropdownIndex(null);
  };

  // Function to fetch playlists
  const fetchPlaylists = async () => {
    try {
      const response = await axiosInstance.get(`/accounts/channels/playlists/${activeChannelId}`);
      if (response.data.success) {
        setPlaylists(response.data.data.playlists);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch playlists.");
      console.error("Error fetching playlists:", error);
    }
  };

  const tracksData = [
    { title: "Got What I Got", artist: "Jason Aldean", duration: "2:58" },
    { title: "Supalonely", artist: "Jason Aldean", duration: "3:14" },
    { title: "Girls In The Hood", artist: "Jason Aldean", duration: "3:21" },
    { title: "Got It On Me", artist: "Jason Aldean & Alan Walker", duration: "3:12" },
    { title: "Righteous", artist: "Jason Aldean", duration: "5:04" },
    { title: "Got What I Got", artist: "Jason Aldean", duration: "2:58" },
    { title: "Got What I Got", artist: "Jason Aldean", duration: "2:58" },
    { title: "Supalonely", artist: "Jason Aldean", duration: "3:14" },
    { title: "Girls In The Hood", artist: "Jason Aldean", duration: "3:21" },
    { title: "Got It On Me", artist: "Jason Aldean & Alan Walker", duration: "3:12" },
  ];

  // Fetch playlists whenever activeChannelId changes
  useEffect(() => {
    if (activeChannelId) {
      fetchPlaylists();
    }
  }, [activeChannelId]);

  const handleCreatePlaylist = async () => {
    if (!name.trim()) {
      alert("Please enter a name for the playlist.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: name,
        visibility: visibility.toUpperCase(),
        is_new: "YES",
        post_id: currentPostId,
      };

      const response = await axiosInstance.post(
        `/accounts/channels/playlists/${activeChannelId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const successMessage = response.data.message;

        setName("");
        setVisibility("private");

        toast.success(successMessage);


        bus.emit('modal_close', true);
        fetchPlaylists();
      } else {
        const errorMessage = response.data.message || "Failed to create channel.";
        toast.error(errorMessage);

      }
    } catch (error) {
      const errorResponse = error.response?.data;
      const errorMessage = errorResponse?.message || "An error occurred while creating the channel.";
      toast.error(`${errorMessage}`);
      // notifyError(errorMessage);
      console.error("Error creating channel:", errorResponse);
    } finally {
      setLoading(false);
    }

    // const handleCloseDrop = () => {
    //   if (openDropdownIndex !== null) setOpenDropdownIndex(null);
    // };
  };

  // Function to handle checkbox change
  // const handlePlaylistChange = (playlistId) => {
  //   setSelectedPlaylists((prev) => {
  //     const newSelectedPlaylists = prev.includes(playlistId)
  //       ? prev.filter(id => id !== playlistId) // Uncheck
  //       : [...prev, playlistId]; // Check

  //     // Call the save function if the playlist is being checked
  //     if (!prev.includes(playlistId)) {
  //       handleSavePlaylists(); // Call save function when a playlist is checked
  //     }

  //     return newSelectedPlaylists;
  //   });
  // };

  return (
    <>
      <style>
        {`
          .container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          /* Hide the browser's default checkbox */
          .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          /* Create a custom checkbox */
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #eee;
          }

          /* On mouse-over, add a grey background color */
          .container:hover input ~ .checkmark {
            background-color: #ccc;
          }

          /* When the checkbox is checked, add a blue background */
          .container input:checked ~ .checkmark {
            background-color: #25D366;
          }

          /* Create the checkmark/indicator (hidden when not checked) */
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }

          /* Show the checkmark when checked */
          .container input:checked ~ .checkmark:after {
            display: block;
          }

          /* Style the checkmark/indicator */
          .container .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        `}
      </style>

      {isDeleting && (
        <div
          className="border d-flex justify-content-center align-items-center"
          style={{
            position: "sticky",
            top: "10px",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "white",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "10",
          }}
        >
          <CircularProgress
            style={{ stroke: "#000", strokeWidth: "4px" }}
            className="position-relative"
            size="1rem"
            sx={{ strokeWidth: "4px" }}
          />
        </div>
      )}

      {/* Replace legacy posts UI with the modern SocialFeed for consistency */}
      <div className="container-fluid pb-5" onClick={handleCloseDrop}>
        <div className="row">
          <div className="col-12 col-lg-10 mx-auto">
            <SocialFeed />
          </div>
        </div>
      </div>

      {/* playlist modal */}
      <div id="modal-topup1" className="zoom-anim-dialog mfp-hide modal modal--form">
        <button className="modal__close" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>

        <h4 className="sign__title">Select Playlists</h4>
        <div className="playlists-container">
          {playlists.map((playlist) => (
            <label key={playlist.playlist_id} className="container d-flex align-items-center mb-2">
              {playlist.title}
              <input
                type="checkbox"
                id={`playlist-${playlist.playlist_id}`}
                checked={selectedPlaylists.includes(playlist.playlist_id)}
                onChange={() => handlePlaylistChange(playlist.playlist_id)}
              />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
        <Link href="#modal-topup4" className="open-modal">
          <button className="sign__btn" type="button">
            Create Playlist
          </button>
        </Link>
      </div>

      <div id="modal-topup4" className="zoom-anim-dialog mfp-hide modal modal--form">
        <button className="modal__close" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>

        <h4 className="sign__title">Create Playlist</h4>
        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="name">Name:</label>
          <div className="sign__group">
            <input type="text" className="sign__input" placeholder="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>


        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="visibility">Select Visibility:</label>
          <div className="sign__group">
            <select id="visibility" className="sign__input" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        <button
          className="sign__btn"
          type="button"
          onClick={handleCreatePlaylist}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Playlist"}
        </button>
      </div>

      <div
        id="modal-info3"
        className={`${isDeleteDialogOpen ? "" : "mfp-hide"
          } zoom-anim-dialog modal modal--info`}
      >
        <span className="modal__icon modal__icon--red">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path>
          </svg>
        </span>

        <button
          className="modal__close"
          onClick={() => setIsDeleteDialogOpen(false)}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>

        <h4 className="sign__title">Confirm deletion!</h4>

        <div className="sign__group sign__group--row">
          {/* <span className="sign__value">Delete Post?</span> */}
        </div>

        <div className="sign__group sign__group--row">
          {/* <label className="sign__label">
            Payment method: <b>Paypal</b>
          </label> */}

          <span className="sign__text sign__text--small">
            Are you sure you want to delete this post? Kindly note that it will
            be totally removed from your list of created posts
          </span>

          <div className="d-flex justify-content-center border mb-4">
            <summary
              role="button"
              className={` d-flex modal__close confirmation`}
            >
              <a
                className={`button mr-2`}
                onClick={() => handleConfirmDelete(false)}
              >
                <i className="bi bi-x text-error" style={{ color: "#ccc" }}></i>
              </a>
              <a className={`button`} onClick={() => handleConfirmDelete(true)}>
                <i
                  className="bi bi-check text-error"
                  style={{ color: "#eb5757" }}
                ></i>
              </a>
            </summary>
          </div>
        </div>
      </div>

      <div
        id="modal-topup"
        className="zoom-anim-dialog mfp-hide modal modal--form"
        style={{ width: "520px", maxWidth: "100%" }}
      >
        <button
          className="modal__close"
          type="button"
          onClick={() => handleResetCreateFields()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>

        <h4 className="sign__title">{modalTitle}</h4>

        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="name">
            Title:
          </label>
          <div className="sign__group">
            <input
              type="text"
              className="sign__input"
              placeholder=""
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="name">
            Channel:
          </label>
          <LiveSelect
            placeholder={`Select Channel...`}
            defaultValue={selectedChannelOption}
            onChange={handleChannelChange}
            value={selectedChannelOption}
            options={Channels.length && Channels?.map((option) => ({
              value: option.channel_id,
              label: option.name,
            }
              // console.log('potion:', option)
            ))}
            isDisabled={modalTitle !== 'Create Post'}
            className="w-100 mb-2"
          />
        </div>

        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="description">
            Description:
          </label>
          <div className="sign__group">
            <textarea
              className="sign__textarea"
              rows={`3`}
              placeholder=""
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="image">
            Post Image:
          </label>
          <div
            className="drop_zone mb-2"
            style={{ minHeight: "10em" }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedImage && (
              <div
                className="change_csv_container pdf_docs d-flex"
                style={{ zIndex: "99" }}
              >
                <div
                  className="btn bg-transparent px-2 py-2 d-flex justify-content-center align-items-center"
                  onClick={handleRemoveFile}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="22"
                      height="22"
                      rx="5"
                      fill="#E5E7EB"
                      fillOpacity="0.7"
                    />
                    <path
                      d="M14.7797 8.17921C14.1088 8.11254 13.438 8.06254 12.763 8.02504V8.02087L12.6713 7.47921C12.6088 7.09587 12.5172 6.52087 11.5422 6.52087H10.4505C9.47968 6.52087 9.38801 7.07087 9.32135 7.47504L9.23385 8.00837C8.84635 8.03337 8.45885 8.05837 8.07135 8.09587L7.22135 8.17921C7.04635 8.19587 6.92135 8.35004 6.93801 8.52087C6.95468 8.69171 7.10468 8.81671 7.27968 8.80004L8.12968 8.71671C10.313 8.50004 12.513 8.58337 14.7213 8.80421C14.7338 8.80421 14.7422 8.80421 14.7547 8.80421C14.913 8.80421 15.0505 8.68337 15.0672 8.52087C15.0797 8.35004 14.9547 8.19587 14.7797 8.17921Z"
                      fill="#292D32"
                    />
                    <path
                      d="M14.0122 9.39163C13.9122 9.28746 13.7747 9.22913 13.6331 9.22913H8.3664C8.22473 9.22913 8.08307 9.28746 7.98723 9.39163C7.8914 9.49579 7.83723 9.63746 7.84557 9.78329L8.1039 14.0583C8.14973 14.6916 8.20807 15.4833 9.66223 15.4833H12.3372C13.7914 15.4833 13.8497 14.6958 13.8956 14.0583L14.1539 9.78746C14.1622 9.63746 14.1081 9.49579 14.0122 9.39163ZM11.6914 13.3958H10.3039C10.1331 13.3958 9.9914 13.2541 9.9914 13.0833C9.9914 12.9125 10.1331 12.7708 10.3039 12.7708H11.6914C11.8622 12.7708 12.0039 12.9125 12.0039 13.0833C12.0039 13.2541 11.8622 13.3958 11.6914 13.3958ZM12.0414 11.7291H9.95807C9.78723 11.7291 9.64557 11.5875 9.64557 11.4166C9.64557 11.2458 9.78723 11.1041 9.95807 11.1041H12.0414C12.2122 11.1041 12.3539 11.2458 12.3539 11.4166C12.3539 11.5875 12.2122 11.7291 12.0414 11.7291Z"
                      fill="#292D32"
                    />
                  </svg>
                </div>
                {/* <button className="btn d-block border m-0 text-danger" onClick={handleReset}><i className="bi bi-arrow-repeats"></i>Delete</button> */}
              </div>
            )}
            {!selectedImage && (
              <input
                type="file"
                onChange={handleFileChange}
                onDrop={handleDrop}
                accept=".png, .jpg, .jpeg"
              />
            )}

            {!selectedImage && (
              <div>
                <div className="mx-auto" style={{ width: "fit-content" }}>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="40"
                      height="40"
                      rx="20"
                      fill="#16151a"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="40"
                      height="40"
                      rx="20"
                      stroke="#16151a"
                      strokeWidth="6"
                    />
                    <g clipPath="url(#clip0_1729_11206)">
                      <path
                        d="M26.3333 26.3332L23 22.9999M23 22.9999L19.6666 26.3332M23 22.9999V30.4999M29.9916 28.3249C30.8044 27.8818 31.4465 27.1806 31.8165 26.3321C32.1866 25.4835 32.2635 24.5359 32.0351 23.6388C31.8068 22.7417 31.2862 21.9462 30.5555 21.3778C29.8248 20.8094 28.9257 20.5005 28 20.4999H26.95C26.6977 19.5243 26.2276 18.6185 25.5749 17.8507C24.9222 17.0829 24.104 16.4731 23.1817 16.0671C22.2594 15.661 21.2571 15.4694 20.2501 15.5065C19.243 15.5436 18.2575 15.8085 17.3676 16.2813C16.4777 16.7541 15.7066 17.4225 15.1122 18.2362C14.5177 19.05 14.1155 19.9879 13.9358 20.9794C13.756 21.9709 13.8034 22.9903 14.0743 23.961C14.3452 24.9316 14.8327 25.8281 15.5 26.5832"
                        stroke="#475467"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1729_11206">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(13 13)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="mb-1">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mb-1 fs-11">PNG, JPG or JPEG file only</p>
                {/* {errorMessage && <p className="text-danger mb-0 fs-11">{errorMessage}</p>} */}
              </div>
            )}
            {selectedImage && (
              <>
                <div className="file_preview" onChange={handleFileChange}>
                  <div className=" w-100">
                    <img src={selectedImage} alt="Selected" />
                  </div>
                </div>
                {/* <img src={selectedFile} alt="Selected" /> */}
              </>
            )}
          </div>
        </div>

        <div className="sign__group sign__group--row">
          <label className="sign__label" htmlFor="music">
            Post Music:
          </label>
          <div
            className="drop_zone mb-2"
            style={{ minHeight: "10em", padding: "20px", textAlign: "center" }}
            onDragOver={handleDragOverAudio}
            onDrop={handleDropAudio}
          >
            {selectedFileAudio && (
              <div
                className="change_csv_container pdf_docs d-flex"
                style={{ zIndex: "99" }}
              >
                <div
                  className="btn bg-transparent px-2 py-2"
                  onClick={handleRemoveFileAudio}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="22"
                      height="22"
                      rx="5"
                      fill="#E5E7EB"
                      fillOpacity="0.7"
                    />
                    <path
                      d="M14.7797 8.17921C14.1088 8.11254 13.438 8.06254 12.763 8.02504V8.02087L12.6713 7.47921C12.6088 7.09587 12.5172 6.52087 11.5422 6.52087H10.4505C9.47968 6.52087 9.38801 7.07087 9.32135 7.47504L9.23385 8.00837C8.84635 8.03337 8.45885 8.05837 8.07135 8.09587L7.22135 8.17921C7.04635 8.19587 6.92135 8.35004 6.93801 8.52087C6.95468 8.69171 7.10468 8.81671 7.27968 8.80004L8.12968 8.71671C10.313 8.50004 12.513 8.58337 14.7213 8.80421C14.7338 8.80421 14.7422 8.80421 14.7547 8.80421C14.913 8.80421 15.0505 8.68337 15.0672 8.52087C15.0797 8.35004 14.9547 8.19587 14.7797 8.17921Z"
                      fill="#292D32"
                    />
                    <path
                      d="M14.0122 9.39163C13.9122 9.28746 13.7747 9.22913 13.6331 9.22913H8.3664C8.22473 9.22913 8.08307 9.28746 7.98723 9.39163C7.8914 9.49579 7.83723 9.63746 7.84557 9.78329L8.1039 14.0583C8.14973 14.6916 8.20807 15.4833 9.66223 15.4833H12.3372C13.7914 15.4833 13.8497 14.6958 13.8956 14.0583L14.1539 9.78746C14.1622 9.63746 14.1081 9.49579 14.0122 9.39163ZM11.6914 13.3958H10.3039C10.1331 13.3958 9.9914 13.2541 9.9914 13.0833C9.9914 12.9125 10.1331 12.7708 10.3039 12.7708H11.6914C11.8622 12.7708 12.0039 12.9125 12.0039 13.0833C12.0039 13.2541 11.8622 13.3958 11.6914 13.3958ZM12.0414 11.7291H9.95807C9.78723 11.7291 9.64557 11.5875 9.64557 11.4166C9.64557 11.2458 9.78723 11.1041 9.95807 11.1041H12.0414C12.2122 11.1041 12.3539 11.2458 12.3539 11.4166C12.3539 11.5875 12.2122 11.7291 12.0414 11.7291Z"
                      fill="#292D32"
                    />
                  </svg>
                </div>
              </div>
            )}

            {!selectedFileAudio && (
              <input
                type="file"
                onChange={(e) => handleFileChangeAudio(e.target.files)}
                ondrop={(e) => handleDropAudio(e.target.files)}
                accept="audio/*"
              />
            )}

            {!selectedFileAudio && (
              <div>
                <div className="mx-auto" style={{ width: "fit-content" }}>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="40"
                      height="40"
                      rx="20"
                      fill="#16151a"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="40"
                      height="40"
                      rx="20"
                      stroke="#16151a"
                      strokeWidth="6"
                    />
                    <g clipPath="url(#clip0_1729_11206)">
                      <path
                        d="M26.3333 26.3332L23 22.9999M23 22.9999L19.6666 26.3332M23 22.9999V30.4999M29.9916 28.3249C30.8044 27.8818 31.4465 27.1806 31.8165 26.3321C32.1866 25.4835 32.2635 24.5359 32.0351 23.6388C31.8068 22.7417 31.2862 21.9462 30.5555 21.3778C29.8248 20.8094 28.9257 20.5005 28 20.4999H26.95C26.6977 19.5243 26.2276 18.6185 25.5749 17.8507C24.9222 17.0829 24.104 16.4731 23.1817 16.0671C22.2594 15.661 21.2571 15.4694 20.2501 15.5065C19.243 15.5436 18.2575 15.8085 17.3676 16.2813C16.4777 16.7541 15.7066 17.4225 15.1122 18.2362C14.5177 19.05 14.1155 19.9879 13.9358 20.9794C13.756 21.9709 13.8034 22.9903 14.0743 23.961C14.3452 24.9316 14.8327 25.8281 15.5 26.5832"
                        stroke="#475467"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1729_11206">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(13 13)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="mb-1">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mb-1 fs-11">
                  Only audio files (mp3, wav) are accepted
                </p>
                {/* {errorMessageAudio && <p className="text-danger mb-0 fs-11">{errorMessageAudio}</p>} */}
              </div>
            )}

            {selectedFileAudio && (
              <>
                <div
                  className="file_previe h-100"
                  onChange={handleFileChangeAudio}
                >
                  <div className=" w-100">
                    <div
                      className="w-100 mx-auto music_details"
                      style={{ minHeight: "auto", position: "relative" }}
                    >
                      <img
                        src={`/img/checkmark.svg`}
                        alt="Selected"
                        style={{
                          transform: "translateY(-30px)",
                          width: "30px",
                        }}
                      />
                      {selectedFileAudio && musicDetails.name !== "" ? (
                        <div
                          style={{
                            transform: "translateY(20px)",
                          }}
                        >
                          <p className="mb-1">File Name: {musicDetails.name}</p>
                          <p className="mb-">Size: {musicDetails.size} MB</p>
                        </div>
                      ) : (
                        <div
                          className="existed_audio_el"
                          style={{
                            transform: "translateY(20px)",
                          }}
                        >
                          <p
                            className="mb- "
                            style={{
                              width: "300px",
                              maxWidth: "100%",
                              margin: "auto",
                              whiteSpace: "normal",
                              wordBreak: "break-all",
                              wordWrap: "normal",
                            }}
                          >
                            {selectedFileAudio}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* <div className="sign__group sign__group--row">
                    <label className="sign__label" htmlFor="image">Post Music:</label>
                    <div className="sign__group">
                        <input
                            type="file"
                            accept=".mp3,.mp4,.wav,.ogg,.flac,.aac"  // Accept multiple audio formats
                            className="sign__input"
                            id="image"
                            onChange={handleAudioChange}
                        />
                    </div>
                </div> */}

        <button
          className="sign__btn"
          type="button"
          disabled={loading}
          onClick={handleFormSubmit}
        >
          {loading ? (
            <CircularProgress size={18} style={{ color: "white" }} />
          ) : (
            modalButtonText
          )}
        </button>
      </div>
    </>
  );
}
