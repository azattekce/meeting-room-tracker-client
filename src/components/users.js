import React, { useEffect, useState } from 'react';
import { getUsers, addUser, deleteUser, getRoles,updateUser } from '../services/api';
import { Modal, Button, Toast, ToastContainer, Spinner } from 'react-bootstrap';

const Users = () => {
    
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // Yükleme durumu
    const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
    const [validationErrors, setValidationErrors] = useState({});
    
    // Add new state variables at the top of the component
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);


    const validateForm = () => {
        const errors = {};
        if (!formData.username) errors.username = 'Kullanıcı adı zorunludur';
        if (!formData.firstname) errors.firstname = 'Ad zorunludur';
        if (!formData.lastname) errors.lastname = 'Soyad zorunludur';
        if (!formData.gsm) errors.gsm = 'GSM zorunludur';
        if (!formData.email) errors.email = 'E-posta zorunludur';
        if (!formData.role_type) errors.role_type = 'Yetki seçimi zorunludur';
        return errors;
    };

    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        gsm: '',
        email: '',
        password: '',
        role_type: ''
    });

    useEffect(() => {
        loadUsers();
        loadRoles();
    }, []);

    const loadUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    const loadRoles = async () => {
        
        try {
            const res = await getRoles();
            setRoles(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, role_type: res.data[0].role_type }));
            }
        } catch (error) {
            console.error('Error loading roles:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setToast({ 
                show: true, 
                message: 'Lütfen zorunlu alanları doldurunuz!', 
                variant: 'info' 
            });
            return;
        }
        setLoading(true); // Yükleme başladığında butonu kilitle
        try {
            await addUser(formData);
            setFormData({
                username: '',
                firstname: '',
                lastname: '',
                gsm: '',
                email: '',
                password: '',
                role_type: roles.length > 0 ? roles[0].role_type : ''
            });
            setShowModal(false);
            loadUsers();
            
            setToast({ show: true, message: 'Kullanıcı başarıyla eklendi!', variant: 'success' });
        } catch (error) {
            setToast({ 
                show: true, 
                message: error.response?.data?.detail || 'Kullanıcı eklenirken bir hata oluştu!', 
                variant: 'danger' 
            });
        } finally {
            setLoading(false); // İşlem bittiğinde butonu tekrar aktif et
        }
    };

    const handleDelete = async (id) => {
        setUserToDelete(id);
        setShowDeleteModal(true);
    };

   // Add new function to handle the actual deletion
const confirmDelete = async () => {
    try {
        await deleteUser(userToDelete);
        loadUsers();
        setToast({ show: true, message: 'Kullanıcı başarıyla silindi!', variant: 'success' });
    } catch (error) {
        setToast({ 
            show: true, 
            message: error.response?.data?.detail || 'Kullanıcı silinirken bir hata oluştu!', 
            variant: 'danger' 
        });
    } finally {
        setShowDeleteModal(false);
        setUserToDelete(null);
    }
};


const handleEdit = (user) => {
    setEditingUser(user);
    console.log(user);

    setFormData({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        gsm: user.gsm,
        email: user.email,
        role_type: user.role_type,
        user_id: user.user_id,
        password:user.password

    });
    setShowEditModal(true);
};
const handleEditSubmit = async (e) => {
    e.preventDefault();
     const errors = validateForm();
    if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setToast({ 
            show: true, 
            message: 'Lütfen zorunlu alanları doldurunuz!', 
            variant: 'info' 
        });   
        return;
    }
    setLoading(true);
    try {
            
        await updateUser(editingUser.user_id, formData);
        setShowEditModal(false);
        loadUsers();
        setToast({ show: true, message: 'Kullanıcı başarıyla güncellendi!', variant: 'success' });
    } catch (error) {
        setToast({ 
            show: true, 
            message: error.response?.data?.detail || 'Kullanıcı güncellenirken bir hata oluştu!', 
            variant: 'danger' 
        });
    } finally {
        setLoading(false);
        setEditingUser(null);
    }
};

    return (
        <div>
            <h2>Kullanıcılar</h2>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
                Yeni Kullanıcı Ekle
            </Button>

            {/* Bootstrap Toast Container */}
            <ToastContainer position="top-end" className="p-3">
                <Toast 
                    show={toast.show} 
                    onClose={() => setToast({ ...toast, show: false })} 
                    delay={3000} 
                    autohide 
                    bg={toast.variant}
                >
                    <Toast.Header>
                        <strong className="me-auto">Bilgilendirme</strong>
                        <small>Şimdi</small>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            {/* Kullanıcı Ekleme Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Kullanıcı Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <input 
                    className={`form-control ${validationErrors.username ? 'is-invalid' : ''}`}
                    placeholder="Kullanıcı Adı"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    {validationErrors.username && (
                    <div className="invalid-feedback">{validationErrors.username}</div>
                    )}
                    </div>

                    <div className="mb-3">
                    <input 
                    className={`form-control ${validationErrors.firstname ? 'is-invalid' : ''}`}
                    placeholder="Ad"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    />
                    {validationErrors.firstname && (
                    <div className="invalid-feedback">{validationErrors.firstname}</div>
                    )}
                    </div>

                    <div className="mb-3">
                    <input 
                    className={`form-control ${validationErrors.lastname ? 'is-invalid' : ''}`}
                    placeholder="Soyad"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    />
                    {validationErrors.lastname && (
                    <div className="invalid-feedback">{validationErrors.lastname}</div>
                    )}
                    </div>

                    <div className="mb-3">
                    <input 
                    className={`form-control ${validationErrors.gsm ? 'is-invalid' : ''}`}
                    placeholder="GSM"
                    value={formData.gsm}
                    onChange={(e) => setFormData({ ...formData, gsm: e.target.value })}
                    />
                    {validationErrors.gsm && (
                    <div className="invalid-feedback">{validationErrors.gsm}</div>
                    )}
                    </div>

                    <div className="mb-3">
                    <input 
                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                    placeholder="E-posta"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {validationErrors.email && (
                    <div className="invalid-feedback">{validationErrors.email}</div>
                    )}
                    </div>

                    <div className="mb-3">
                    <select 
                    className={`form-control ${validationErrors.role_type ? 'is-invalid' : ''}`}
                    value={formData.role_id}
                    onChange={(e) => setFormData({ ...formData, role_type: parseInt(e.target.value) })}
                    >
                    <option value="">Yetki Seçiniz</option>
                    {roles.map(role => (
                    <option key={role.role_type} value={role.role_type}>
                        {role.role_name}
                    </option>
                    ))}
                    </select>
                    {validationErrors.role_type && (
                    <div className="invalid-feedback">{validationErrors.role_type}</div>
                    )}
                    </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
                        İptal
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Kaydediliyor...
                            </>
                        ) : (
                            "Kaydet"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Kullanıcı Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-3">
                            <input 
                                className={`form-control ${validationErrors.username ? 'is-invalid' : ''}`}
                                placeholder="Kullanıcı Adı"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                            {validationErrors.username && (
                                <div className="invalid-feedback">{validationErrors.username}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input 
                                className={`form-control ${validationErrors.firstname ? 'is-invalid' : ''}`}
                                placeholder="Ad"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            />
                            {validationErrors.firstname && (
                                <div className="invalid-feedback">{validationErrors.firstname}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input 
                                className={`form-control ${validationErrors.lastname ? 'is-invalid' : ''}`}
                                placeholder="Soyad"
                                value={formData.lastname}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            />
                            {validationErrors.lastname && (
                                <div className="invalid-feedback">{validationErrors.lastname}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input 
                                className={`form-control ${validationErrors.gsm ? 'is-invalid' : ''}`}
                                placeholder="GSM"
                                value={formData.gsm}
                                onChange={(e) => setFormData({ ...formData, gsm: e.target.value })}
                            />
                            {validationErrors.gsm && (
                                <div className="invalid-feedback">{validationErrors.gsm}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input 
                                className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                placeholder="E-posta"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {validationErrors.email && (
                                <div className="invalid-feedback">{validationErrors.email}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <select 
                                className={`form-control ${validationErrors.role_type ? 'is-invalid' : ''}`}
                                value={formData.role_type}
                                onChange={(e) => setFormData({ ...formData, role_type: parseInt(e.target.value) })}
                            >
                                <option value="">Yetki Seçiniz</option>
                                {roles.map(role => (
                                    <option key={role.role_type} value={role.role_type}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>
                            {validationErrors.role_type && (
                                <div className="invalid-feedback">{validationErrors.role_type}</div>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={loading}>
                        İptal
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Güncelleniyor...
                            </>
                        ) : (
                            "Güncelle"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Kullanıcı Silme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Bu kullanıcıyı silmek istediğinizden emin misiniz?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            İptal
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
            Sil
            </Button>
            </Modal.Footer>
            </Modal>

            {/* Kullanıcı Listesi */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Kullanıcı Adı</th>
                        <th>Ad Soyad</th>
                        <th>E-posta</th>
                        <th>GSM</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.username}</td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.gsm}</td>
                            <td>
                            <div className="btn-group">
                            <button 
                            className="btn btn-primary btn-sm me-2" 
                            onClick={() => handleEdit(user)}
                            >
                            Düzenle
                            </button>
                            <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(user.user_id)}
                            >
                            Sil
                            </button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
