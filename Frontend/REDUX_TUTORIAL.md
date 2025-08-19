# Redux Implementation Tutorial

## 🎯 **Overview**

This tutorial covers the complete Redux implementation in the Outre Couture project, including Redux Toolkit, async thunks, state management, and admin dashboard routing.

## 📚 **Redux Concepts Covered**

### **1. Redux Toolkit (RTK)**
- Modern Redux with simplified setup
- Built-in Immer for immutable updates
- Automatic action creators
- DevTools integration

### **2. Store Structure**
```
store/
├── index.js              # Main store configuration
├── hooks.js              # Custom Redux hooks
└── slices/
    ├── authSlice.js      # Authentication state
    ├── adminSlice.js     # Admin panel state
    ├── productSlice.js   # Product management
    ├── categorySlice.js  # Category management
    └── rfqSlice.js       # RFQ management
```

### **3. Key Concepts Implemented**

#### **Slices**
- **Auth Slice**: User authentication, token management, role-based access
- **Admin Slice**: Admin panel state, dashboard routing, UI state
- **Product Slice**: Product CRUD operations, filtering, pagination
- **Category Slice**: Category management
- **RFQ Slice**: RFQ request management and status updates

#### **Async Thunks**
- API calls with loading states
- Error handling
- Optimistic updates
- Automatic re-renders

#### **State Management**
- Centralized state
- Predictable state updates
- Time-travel debugging
- Performance optimization

## 🚀 **Implementation Details**

### **1. Store Configuration**

```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    products: productReducer,
    categories: categoryReducer,
    rfq: rfqReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
});
```

### **2. Slice Structure**

```javascript
// Example: authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiService.login(credentials);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.error || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // ... other reducers
  },
  extraReducers: (builder) => {
    // Handle async thunk states
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
```

### **3. Custom Hooks**

```javascript
// store/hooks.js
import { useDispatch, useSelector } from 'react-redux';

// Custom hooks for easier state access
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useIsAdmin = () => {
  return useAppSelector((state) => state.auth.isAdmin);
};

export const useActiveTab = () => {
  return useAppSelector((state) => state.admin.activeTab);
};
```

### **4. Component Integration**

```javascript
// Example: AdminLoginForm.jsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';

export default function AdminLoginForm({ onSuccess }) {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      dispatch(clearError());
      const result = await dispatch(loginUser(data)).unwrap();
      
      if (result.user?.role === 'admin') {
        onSuccess();
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Component JSX
  );
}
```

## 🔄 **Admin Dashboard Routing Logic**

### **1. Automatic Dashboard Routing**

```javascript
// app/admin/page.jsx
useEffect(() => {
  if (!loading && !isAuthenticated) {
    dispatch(setShowLoginForm(true));
  } else if (!loading && isAuthenticated && !isAdmin) {
    router.push('/');
  } else if (!loading && isAuthenticated && isAdmin) {
    // Auto-route to dashboard for admin users
    dispatch(setActiveTab('dashboard'));
    dispatch(setShowLoginForm(false));
  }
}, [isAuthenticated, isAdmin, loading, router, dispatch]);
```

### **2. Tab Management**

```javascript
const handleTabChange = (tab) => {
  dispatch(setActiveTab(tab));
};

// In JSX
<button onClick={() => handleTabChange(tab.id)}>
  {tab.name}
</button>
```

### **3. State Persistence**

- Admin tab state persists during session
- Automatic dashboard routing for authenticated admins
- Smooth transitions between tabs

## 📊 **State Management Patterns**

### **1. Loading States**

```javascript
// Multiple loading states for different operations
const { loading: authLoading } = useAppSelector((state) => state.auth);
const { loading: productsLoading } = useAppSelector((state) => state.products);
const { loading: categoriesLoading } = useAppSelector((state) => state.categories);
```

### **2. Error Handling**

```javascript
// Centralized error handling
const { error: authError } = useAppSelector((state) => state.auth);
const { error: productsError } = useAppSelector((state) => state.products);

// Clear errors when needed
dispatch(clearError());
```

### **3. Optimistic Updates**

```javascript
// Example: Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiService.deleteProduct(productId);
      if (response.success) {
        return productId; // Return ID for optimistic update
      } else {
        return rejectWithValue(response.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// In reducer
.addCase(deleteProduct.fulfilled, (state, action) => {
  state.loading = false;
  state.products = state.products.filter(p => p.id !== action.payload);
  state.pagination.total -= 1;
})
```

## 🎨 **UI State Management**

### **1. Admin Panel State**

```javascript
// adminSlice.js
const initialState = {
  activeTab: 'dashboard',
  showLoginForm: false,
  dashboardStats: {
    products: 0,
    categories: 0,
    rfqRequests: 0,
    newRFQ: 0,
  },
  loading: false,
  error: null,
};
```

### **2. Product Filters**

```javascript
// productSlice.js
const initialState = {
  filters: {
    category_id: '',
    search: '',
    sortBy: 'name',
    viewMode: 'grid',
  },
  pagination: {
    total: 0,
    limit: 50,
    skip: 0,
  },
};
```

## 🔧 **Best Practices Implemented**

### **1. Action Naming**
- Use descriptive action names
- Follow Redux naming conventions
- Use async thunks for API calls

### **2. State Structure**
- Normalized state shape
- Avoid nested objects
- Use IDs for relationships

### **3. Performance**
- Selective re-renders with useSelector
- Memoized selectors
- Efficient state updates

### **4. Error Handling**
- Centralized error states
- User-friendly error messages
- Automatic error clearing

## 🚀 **Usage Examples**

### **1. Dispatching Actions**

```javascript
// Login user
const result = await dispatch(loginUser(credentials)).unwrap();

// Update filters
dispatch(setFilters({ category_id: '123' }));

// Clear errors
dispatch(clearError());
```

### **2. Accessing State**

```javascript
// Get auth state
const { user, isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);

// Get specific data
const isAdmin = useIsAdmin();
const activeTab = useActiveTab();
```

### **3. Loading States**

```javascript
// Show loading spinner
{loading && <Spinner />}

// Disable button during loading
<button disabled={loading}>Submit</button>
```

## 🔍 **Debugging with Redux DevTools**

### **1. Installation**
- Redux DevTools browser extension
- Automatic integration with RTK

### **2. Features**
- Time-travel debugging
- State inspection
- Action replay
- Performance monitoring

### **3. Usage**
- Open DevTools in browser
- Inspect state changes
- Replay actions
- Monitor performance

## 📈 **Benefits of This Implementation**

### **1. Predictable State**
- Single source of truth
- Immutable updates
- Time-travel debugging

### **2. Performance**
- Selective re-renders
- Optimized updates
- Efficient state management

### **3. Developer Experience**
- TypeScript support
- DevTools integration
- Clear action flow

### **4. Scalability**
- Modular architecture
- Easy to extend
- Maintainable code

## 🎓 **Learning Resources**

### **1. Redux Toolkit Documentation**
- [Official RTK Guide](https://redux-toolkit.js.org/)
- [Redux Toolkit Tutorial](https://redux-toolkit.js.org/tutorials/quick-start)

### **2. Redux Concepts**
- [Redux Fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Redux Best Practices](https://redux.js.org/style-guide/)

### **3. Async Redux**
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)

This implementation provides a solid foundation for state management in the Outre Couture project, with modern Redux patterns and best practices for scalable applications.
